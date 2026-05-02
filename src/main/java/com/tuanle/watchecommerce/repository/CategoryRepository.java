package com.tuanle.watchecommerce.repository;

import com.tuanle.watchecommerce.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
