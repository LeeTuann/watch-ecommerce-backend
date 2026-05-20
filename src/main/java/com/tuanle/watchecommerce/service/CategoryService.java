package com.tuanle.watchecommerce.service;

import com.tuanle.watchecommerce.entity.Category;
import java.util.List;

public interface CategoryService {
    Category createCategory(Category category);
    Category getCategoryById(Long id);
    List<Category> getAllCategories();
    Category updateCategory(Long id, Category categoryDetails);
    void deleteCategory(Long id);
}
