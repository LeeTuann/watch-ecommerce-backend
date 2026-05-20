package com.tuanle.watchecommerce.controller.user;

import com.tuanle.watchecommerce.dto.CardResponse;
import com.tuanle.watchecommerce.dto.CartRequest;
import com.tuanle.watchecommerce.entity.User;
import com.tuanle.watchecommerce.exception.ResourceNotFoundException;
import com.tuanle.watchecommerce.repository.UserRepository;
import com.tuanle.watchecommerce.service.CartService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;
    private final UserRepository userRepository;

    public CartController(CartService cartService, UserRepository userRepository) {
        this.cartService = cartService;
        this.userRepository = userRepository;
    }

    private Long getCurrentUserId() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("Authenticated user not found"));
        return user.getId();
    }

    @GetMapping
    public ResponseEntity<CardResponse> getCart() {
        return ResponseEntity.ok(cartService.getCartByUserId(getCurrentUserId()));
    }

    @PostMapping("/items")
    public ResponseEntity<CardResponse> addItemToCart(@RequestBody CartRequest cartRequest) {
        return ResponseEntity.ok(cartService.addItemToCart(getCurrentUserId(), cartRequest));
    }

    @PutMapping("/items/{productId}")
    public ResponseEntity<CardResponse> updateItemQuantity(@PathVariable Long productId,
                                                           @RequestParam int quantity) {
        return ResponseEntity.ok(cartService.updateItemQuantity(getCurrentUserId(), productId, quantity));
    }

    @DeleteMapping("/items/{productId}")
    public ResponseEntity<CardResponse> removeItemFromCart(@PathVariable Long productId) {
        return ResponseEntity.ok(cartService.removeItemFromCart(getCurrentUserId(), productId));
    }

    @DeleteMapping
    public ResponseEntity<Void> clearCart() {
        cartService.clearCart(getCurrentUserId());
        return ResponseEntity.noContent().build();
    }
}
