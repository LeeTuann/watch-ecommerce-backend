package com.tuanle.watchecommerce.service.impl;

import com.tuanle.watchecommerce.entity.Category;
import com.tuanle.watchecommerce.repository.CategoryRepository;
import com.tuanle.watchecommerce.service.CategoryService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public Category createCategory(Category category) {
        if (category == null) {
            throw new IllegalArgumentException("Category cannot be null");
        }
        return categoryRepository.save(category);
    }

    @Override
    @Transactional(readOnly = true)
    public Category getCategoryById(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + id));
    }

    @Override
    @Transactional(readOnly = true)
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Category updateCategory(Long id, Category categoryDetails) {
        if (categoryDetails == null) {
            throw new IllegalArgumentException("Category details cannot be null");
        }
        Category category = getCategoryById(id);
        category.setName(categoryDetails.getName());
        // Products list and other properties can be updated as needed, but standard is name
        return categoryRepository.save(category);
    }

    @Override
    public void deleteCategory(Long id) {
        Category category = getCategoryById(id);
        categoryRepository.delete(category);
    }
}
