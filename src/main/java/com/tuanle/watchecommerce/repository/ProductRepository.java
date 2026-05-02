package com.tuanle.watchecommerce.repository;

import com.tuanle.watchecommerce.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
