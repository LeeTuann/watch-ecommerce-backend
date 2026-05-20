package com.tuanle.watchecommerce.controller.admin;

import com.tuanle.watchecommerce.dto.ProductRequest;
import com.tuanle.watchecommerce.dto.ProductResponse;
import com.tuanle.watchecommerce.entity.Brand;
import com.tuanle.watchecommerce.entity.Category;
import com.tuanle.watchecommerce.service.BrandService;
import com.tuanle.watchecommerce.service.CategoryService;
import com.tuanle.watchecommerce.service.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminProductController {

    private final ProductService productService;
    private final CategoryService categoryService;
    private final BrandService brandService;

    public AdminProductController(ProductService productService,
                                  CategoryService categoryService,
                                  BrandService brandService) {
        this.productService = productService;
        this.categoryService = categoryService;
        this.brandService = brandService;
    }

    // Brands Management
    @PostMapping("/brands")
    public ResponseEntity<Brand> createBrand(@RequestBody Brand brand) {
        Brand created = brandService.createBrand(brand);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PutMapping("/brands/{id}")
    public ResponseEntity<Brand> updateBrand(@PathVariable Long id, @RequestBody Brand brand) {
        Brand updated = brandService.updateBrand(id, brand);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/brands/{id}")
    public ResponseEntity<Void> deleteBrand(@PathVariable Long id) {
        brandService.deleteBrand(id);
        return ResponseEntity.noContent().build();
    }

    // Categories Management
    @PostMapping("/categories")
    public ResponseEntity<Category> createCategory(@RequestBody Category category) {
        Category created = categoryService.createCategory(category);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PutMapping("/categories/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable Long id, @RequestBody Category category) {
        Category updated = categoryService.updateCategory(id, category);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/categories/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.noContent().build();
    }

    // Products Management
    @PostMapping("/products")
    public ResponseEntity<ProductResponse> createProduct(@RequestBody ProductRequest productRequest) {
        ProductResponse created = productService.createProduct(productRequest);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PutMapping("/products/{id}")
    public ResponseEntity<ProductResponse> updateProduct(@PathVariable Long id, @RequestBody ProductRequest productRequest) {
        ProductResponse updated = productService.updateProduct(id, productRequest);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
}
