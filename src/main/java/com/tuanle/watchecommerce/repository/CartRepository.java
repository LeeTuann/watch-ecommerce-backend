package com.tuanle.watchecommerce.repository;

import com.tuanle.watchecommerce.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart, Long> {
}
