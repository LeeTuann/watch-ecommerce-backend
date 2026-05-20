package com.tuanle.watchecommerce.service.impl;

import com.tuanle.watchecommerce.dto.OrderRequest;
import com.tuanle.watchecommerce.dto.OrderResponse;
import com.tuanle.watchecommerce.entity.*;
import com.tuanle.watchecommerce.enums.OrderStatus;
import com.tuanle.watchecommerce.exception.BadRequestException;
import com.tuanle.watchecommerce.exception.ResourceNotFoundException;
import com.tuanle.watchecommerce.mapper.AppMapper;
import com.tuanle.watchecommerce.repository.*;
import com.tuanle.watchecommerce.service.OrderService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final AppMapper appMapper;

    public OrderServiceImpl(OrderRepository orderRepository,
                            OrderItemRepository orderItemRepository,
                            CartRepository cartRepository,
                            CartItemRepository cartItemRepository,
                            ProductRepository productRepository,
                            UserRepository userRepository,
                            AppMapper appMapper) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.appMapper = appMapper;
    }

    @Override
    public OrderResponse createOrder(Long userId, OrderRequest orderRequest) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new BadRequestException("Cart not found for user. Cannot checkout."));

        if (cart.getItems() == null || cart.getItems().isEmpty()) {
            throw new BadRequestException("Cart is empty. Cannot checkout.");
        }

        // Validate and update stock
        double total = 0.0;
        List<OrderItem> orderItems = new ArrayList<>();

        Order order = new Order();
        order.setUser(user);
        order.setCreatedAt(LocalDateTime.now());
        order.setStatus(OrderStatus.PENDING);
        order.setItems(orderItems);

        // Pre-save order to obtain ID for order items
        Order savedOrder = orderRepository.save(order);

        for (CartItem cartItem : cart.getItems()) {
            Product product = cartItem.getProduct();
            if (product.getStock() < cartItem.getQuantity()) {
                throw new BadRequestException("Not enough stock available for product: " + product.getName()
                        + " (Available: " + product.getStock() + ")");
            }

            // Decrement stock
            product.setStock(product.getStock() - cartItem.getQuantity());
            productRepository.save(product);

            // Create OrderItem
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(savedOrder);
            orderItem.setProduct(product);
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setPrice(product.getPrice());

            OrderItem savedOrderItem = orderItemRepository.save(orderItem);
            orderItems.add(savedOrderItem);

            total += product.getPrice() * cartItem.getQuantity();
        }

        savedOrder.setTotal(total);
        savedOrder.setItems(orderItems);
        Order finalizedOrder = orderRepository.save(savedOrder);

        // Clear cart
        cartItemRepository.deleteAll(cart.getItems());
        cart.getItems().clear();
        cartRepository.save(cart);

        return appMapper.toOrderResponse(finalizedOrder);
    }

    @Override
    @Transactional(readOnly = true)
    public OrderResponse getOrderById(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + orderId));
        return appMapper.toOrderResponse(order);
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderResponse> getOrdersByUserId(Long userId) {
        if (!userRepository.existsById(userId)) {
            throw new ResourceNotFoundException("User not found with id: " + userId);
        }
        return orderRepository.findByUserId(userId).stream()
                .map(appMapper::toOrderResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderResponse> getAllOrders() {
        return orderRepository.findAll().stream()
                .map(appMapper::toOrderResponse)
                .collect(Collectors.toList());
    }

    @Override
    public OrderResponse updateOrderStatus(Long orderId, String status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + orderId));

        try {
            OrderStatus orderStatus = OrderStatus.valueOf(status.toUpperCase());
            order.setStatus(orderStatus);
        } catch (IllegalArgumentException e) {
            throw new BadRequestException("Invalid order status: " + status);
        }

        Order updatedOrder = orderRepository.save(order);
        return appMapper.toOrderResponse(updatedOrder);
    }

    @Override
    public OrderResponse cancelOrder(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + orderId));

        if (order.getStatus() == OrderStatus.CANCELLED) {
            throw new BadRequestException("Order is already cancelled");
        }

        if (order.getStatus() == OrderStatus.SHIPPING || order.getStatus() == OrderStatus.DELIVERED) {
            throw new BadRequestException("Order cannot be cancelled. Current status is " + order.getStatus());
        }

        // Restore stock
        for (OrderItem item : order.getItems()) {
            Product product = item.getProduct();
            product.setStock(product.getStock() + item.getQuantity());
            productRepository.save(product);
        }

        order.setStatus(OrderStatus.CANCELLED);
        Order updatedOrder = orderRepository.save(order);
        return appMapper.toOrderResponse(updatedOrder);
    }
}
