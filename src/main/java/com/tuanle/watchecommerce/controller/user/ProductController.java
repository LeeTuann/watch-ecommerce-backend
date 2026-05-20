package com.tuanle.watchecommerce.controller.user;

import com.tuanle.watchecommerce.dto.ProductResponse;
import com.tuanle.watchecommerce.entity.Brand;
import com.tuanle.watchecommerce.entity.Category;
import com.tuanle.watchecommerce.service.BrandService;
import com.tuanle.watchecommerce.service.CategoryService;
import com.tuanle.watchecommerce.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;
    private final CategoryService categoryService;
    private final BrandService brandService;

    public ProductController(ProductService productService,
                             CategoryService categoryService,
                             BrandService brandService) {
        this.productService = productService;
        this.categoryService = categoryService;
        this.brandService = brandService;
    }

    @GetMapping
    public ResponseEntity<List<ProductResponse>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<ProductResponse>> getProductsByCategory(@PathVariable Long categoryId) {
        return ResponseEntity.ok(productService.getProductsByCategory(categoryId));
    }

    @GetMapping("/brand/{brandId}")
    public ResponseEntity<List<ProductResponse>> getProductsByBrand(@PathVariable Long brandId) {
        return ResponseEntity.ok(productService.getProductsByBrand(brandId));
    }

    @GetMapping("/categories")
    public ResponseEntity<List<Category>> getAllCategories() {
        return ResponseEntity.ok(categoryService.getAllCategories());
    }

    @GetMapping("/brands")
    public ResponseEntity<List<Brand>> getAllBrands() {
        return ResponseEntity.ok(brandService.getAllBrands());
    }
}
