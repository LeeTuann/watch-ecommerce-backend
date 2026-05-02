package com.tuanle.watchecommerce.repository;

import com.tuanle.watchecommerce.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
