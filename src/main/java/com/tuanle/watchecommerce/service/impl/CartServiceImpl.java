package com.tuanle.watchecommerce.service.impl;

import com.tuanle.watchecommerce.dto.CardResponse;
import com.tuanle.watchecommerce.dto.CartRequest;
import com.tuanle.watchecommerce.entity.Cart;
import com.tuanle.watchecommerce.entity.CartItem;
import com.tuanle.watchecommerce.entity.Product;
import com.tuanle.watchecommerce.entity.User;
import com.tuanle.watchecommerce.exception.BadRequestException;
import com.tuanle.watchecommerce.exception.ResourceNotFoundException;
import com.tuanle.watchecommerce.mapper.AppMapper;
import com.tuanle.watchecommerce.repository.CartItemRepository;
import com.tuanle.watchecommerce.repository.CartRepository;
import com.tuanle.watchecommerce.repository.ProductRepository;
import com.tuanle.watchecommerce.repository.UserRepository;
import com.tuanle.watchecommerce.service.CartService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Optional;

@Service
@Transactional
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final AppMapper appMapper;

    public CartServiceImpl(CartRepository cartRepository,
                           CartItemRepository cartItemRepository,
                           ProductRepository productRepository,
                           UserRepository userRepository,
                           AppMapper appMapper) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.appMapper = appMapper;
    }

    private Cart getOrCreateCart(Long userId) {
        return cartRepository.findByUserId(userId)
                .orElseGet(() -> {
                    User user = userRepository.findById(userId)
                            .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
                    Cart newCart = new Cart();
                    newCart.setUser(user);
                    newCart.setItems(new ArrayList<>());
                    return cartRepository.save(newCart);
                });
    }

    @Override
    @Transactional(readOnly = true)
    public CardResponse getCartByUserId(Long userId) {
        Cart cart = getOrCreateCart(userId);
        return appMapper.toCardResponse(cart);
    }

    @Override
    public CardResponse addItemToCart(Long userId, CartRequest cartRequest) {
        Cart cart = getOrCreateCart(userId);
        Product product = productRepository.findById(cartRequest.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + cartRequest.getProductId()));

        if (cartRequest.getQuantity() <= 0) {
            throw new BadRequestException("Quantity must be greater than zero");
        }

        if (product.getStock() < cartRequest.getQuantity()) {
            throw new BadRequestException("Not enough stock available for product: " + product.getName());
        }

        if (cart.getItems() == null) {
            cart.setItems(new ArrayList<>());
        }

        Optional<CartItem> existingItem = cart.getItems().stream()
                .filter(item -> item.getProduct().getId().equals(product.getId()))
                .findFirst();

        if (existingItem.isPresent()) {
            CartItem item = existingItem.get();
            int newQuantity = item.getQuantity() + cartRequest.getQuantity();
            if (product.getStock() < newQuantity) {
                throw new BadRequestException("Cannot add requested quantity. Total quantity exceeds product stock.");
            }
            item.setQuantity(newQuantity);
            cartItemRepository.save(item);
        } else {
            CartItem newItem = new CartItem();
            newItem.setCart(cart);
            newItem.setProduct(product);
            newItem.setQuantity(cartRequest.getQuantity());
            CartItem savedItem = cartItemRepository.save(newItem);
            cart.getItems().add(savedItem);
        }

        Cart updatedCart = cartRepository.save(cart);
        return appMapper.toCardResponse(updatedCart);
    }

    @Override
    public CardResponse removeItemFromCart(Long userId, Long productId) {
        Cart cart = getOrCreateCart(userId);
        if (cart.getItems() != null) {
            Optional<CartItem> itemToRemove = cart.getItems().stream()
                    .filter(item -> item.getProduct().getId().equals(productId))
                    .findFirst();

            if (itemToRemove.isPresent()) {
                CartItem item = itemToRemove.get();
                cart.getItems().remove(item);
                cartItemRepository.delete(item);
                cart = cartRepository.save(cart);
            } else {
                throw new ResourceNotFoundException("Product not found in cart");
            }
        }
        return appMapper.toCardResponse(cart);
    }

    @Override
    public CardResponse updateItemQuantity(Long userId, Long productId, int quantity) {
        Cart cart = getOrCreateCart(userId);
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + productId));

        if (cart.getItems() == null) {
            throw new ResourceNotFoundException("Cart is empty");
        }

        Optional<CartItem> existingItem = cart.getItems().stream()
                .filter(item -> item.getProduct().getId().equals(productId))
                .findFirst();

        if (!existingItem.isPresent()) {
            throw new ResourceNotFoundException("Product not found in cart");
        }

        CartItem item = existingItem.get();
        if (quantity <= 0) {
            cart.getItems().remove(item);
            cartItemRepository.delete(item);
        } else {
            if (product.getStock() < quantity) {
                throw new BadRequestException("Not enough stock available for product: " + product.getName());
            }
            item.setQuantity(quantity);
            cartItemRepository.save(item);
        }

        Cart updatedCart = cartRepository.save(cart);
        return appMapper.toCardResponse(updatedCart);
    }

    @Override
    public void clearCart(Long userId) {
        Cart cart = getOrCreateCart(userId);
        if (cart.getItems() != null && !cart.getItems().isEmpty()) {
            cartItemRepository.deleteAll(cart.getItems());
            cart.getItems().clear();
            cartRepository.save(cart);
        }
    }
}
