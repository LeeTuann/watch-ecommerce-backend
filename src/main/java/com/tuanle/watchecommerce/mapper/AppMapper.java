package com.tuanle.watchecommerce.mapper;

import com.tuanle.watchecommerce.dto.*;
import com.tuanle.watchecommerce.entity.*;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class AppMapper {

    // User mapping
    public UserResponse toUserResponse(User user) {
        if (user == null) {
            return null;
        }
        return new UserResponse(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getRole()
        );
    }

    // Product mapping
    public ProductResponse toProductResponse(Product product) {
        if (product == null) {
            return null;
        }
        String brandName = (product.getBrand() != null) ? product.getBrand().getName() : null;
        String categoryName = (product.getCategory() != null) ? product.getCategory().getName() : null;
        return new ProductResponse(
                product.getId(),
                product.getName(),
                product.getPrice(),
                product.getStock(),
                brandName,
                categoryName
        );
    }

    // CartItem mapping
    public CardItemResponse toCardItemResponse(CartItem cartItem) {
        if (cartItem == null) {
            return null;
        }
        Long productId = (cartItem.getProduct() != null) ? cartItem.getProduct().getId() : null;
        String productName = (cartItem.getProduct() != null) ? cartItem.getProduct().getName() : null;
        double productPrice = (cartItem.getProduct() != null) ? cartItem.getProduct().getPrice() : 0.0;
        return new CardItemResponse(
                cartItem.getId(),
                productId,
                productName,
                productPrice,
                cartItem.getQuantity()
        );
    }

    // Cart mapping
    public CardResponse toCardResponse(Cart cart) {
        if (cart == null) {
            return null;
        }
        List<CardItemResponse> items = (cart.getItems() != null)
                ? cart.getItems().stream().map(this::toCardItemResponse).collect(Collectors.toList())
                : Collections.emptyList();
        
        double totalAmount = items.stream()
                .mapToDouble(item -> item.getProductPrice() * item.getQuantity())
                .sum();

        return new CardResponse(
                cart.getId(),
                items,
                totalAmount
        );
    }

    // OrderItem mapping
    public OrderItemResponse toOrderItemResponse(OrderItem orderItem) {
        if (orderItem == null) {
            return null;
        }
        Long productId = (orderItem.getProduct() != null) ? orderItem.getProduct().getId() : null;
        String productName = (orderItem.getProduct() != null) ? orderItem.getProduct().getName() : null;
        return new OrderItemResponse(
                orderItem.getId(),
                productId,
                productName,
                orderItem.getPrice(),
                orderItem.getQuantity()
        );
    }

    // Order mapping
    public OrderResponse toOrderResponse(Order order) {
        if (order == null) {
            return null;
        }
        List<OrderItemResponse> items = (order.getItems() != null)
                ? order.getItems().stream().map(this::toOrderItemResponse).collect(Collectors.toList())
                : Collections.emptyList();

        return new OrderResponse(
                order.getId(),
                order.getTotal(),
                order.getCreatedAt(),
                order.getStatus(),
                items,
                order.getPaymentMethod()
        );
    }
}
