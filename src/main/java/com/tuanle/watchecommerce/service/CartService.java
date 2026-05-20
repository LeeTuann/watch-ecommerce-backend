package com.tuanle.watchecommerce.service;

import com.tuanle.watchecommerce.dto.CardResponse;
import com.tuanle.watchecommerce.dto.CartRequest;

public interface CartService {
    CardResponse getCartByUserId(Long userId);
    CardResponse addItemToCart(Long userId, CartRequest cartRequest);
    CardResponse removeItemFromCart(Long userId, Long productId);
    CardResponse updateItemQuantity(Long userId, Long productId, int quantity);
    void clearCart(Long userId);
}
