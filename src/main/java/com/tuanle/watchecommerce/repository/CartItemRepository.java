package com.tuanle.watchecommerce.repository;

import com.tuanle.watchecommerce.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
}
