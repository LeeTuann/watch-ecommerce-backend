package com.tuanle.watchecommerce.service;

import com.tuanle.watchecommerce.dto.ProductRequest;
import com.tuanle.watchecommerce.dto.ProductResponse;

import java.util.List;

public interface ProductService {
    ProductResponse createProduct(ProductRequest productRequest);
    ProductResponse updateProduct(Long id, ProductRequest productRequest);
    void deleteProduct(Long id);
    ProductResponse getProductById(Long id);
    List<ProductResponse> getAllProducts();
    List<ProductResponse> getProductsByCategory(Long categoryId);
    List<ProductResponse> getProductsByBrand(Long brandId);
}
