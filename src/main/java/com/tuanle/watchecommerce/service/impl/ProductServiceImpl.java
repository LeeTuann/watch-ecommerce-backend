package com.tuanle.watchecommerce.service.impl;

import com.tuanle.watchecommerce.dto.ProductRequest;
import com.tuanle.watchecommerce.dto.ProductResponse;
import com.tuanle.watchecommerce.entity.Brand;
import com.tuanle.watchecommerce.entity.Category;
import com.tuanle.watchecommerce.entity.Product;
import com.tuanle.watchecommerce.exception.ResourceNotFoundException;
import com.tuanle.watchecommerce.mapper.AppMapper;
import com.tuanle.watchecommerce.repository.BrandRepository;
import com.tuanle.watchecommerce.repository.CategoryRepository;
import com.tuanle.watchecommerce.repository.ProductRepository;
import com.tuanle.watchecommerce.service.ProductService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final BrandRepository brandRepository;
    private final CategoryRepository categoryRepository;
    private final AppMapper appMapper;

    public ProductServiceImpl(ProductRepository productRepository,
                              BrandRepository brandRepository,
                              CategoryRepository categoryRepository,
                              AppMapper appMapper) {
        this.productRepository = productRepository;
        this.brandRepository = brandRepository;
        this.categoryRepository = categoryRepository;
        this.appMapper = appMapper;
    }

    @Override
    public ProductResponse createProduct(ProductRequest productRequest) {
        Brand brand = brandRepository.findById(productRequest.getBrandId())
                .orElseThrow(() -> new ResourceNotFoundException("Brand not found with id: " + productRequest.getBrandId()));

        Category category = categoryRepository.findById(productRequest.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + productRequest.getCategoryId()));

        Product product = new Product();
        product.setName(productRequest.getName());
        product.setPrice(productRequest.getPrice());
        product.setStock(productRequest.getStock());
        product.setBrand(brand);
        product.setCategory(category);

        Product savedProduct = productRepository.save(product);
        return appMapper.toProductResponse(savedProduct);
    }

    @Override
    public ProductResponse updateProduct(Long id, ProductRequest productRequest) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));

        Brand brand = brandRepository.findById(productRequest.getBrandId())
                .orElseThrow(() -> new ResourceNotFoundException("Brand not found with id: " + productRequest.getBrandId()));

        Category category = categoryRepository.findById(productRequest.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + productRequest.getCategoryId()));

        product.setName(productRequest.getName());
        product.setPrice(productRequest.getPrice());
        product.setStock(productRequest.getStock());
        product.setBrand(brand);
        product.setCategory(category);

        Product updatedProduct = productRepository.save(product);
        return appMapper.toProductResponse(updatedProduct);
    }

    @Override
    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
        productRepository.delete(product);
    }

    @Override
    @Transactional(readOnly = true)
    public ProductResponse getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
        return appMapper.toProductResponse(product);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductResponse> getAllProducts() {
        return productRepository.findAll().stream()
                .map(appMapper::toProductResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductResponse> getProductsByCategory(Long categoryId) {
        // Ensure category exists
        if (!categoryRepository.existsById(categoryId)) {
            throw new ResourceNotFoundException("Category not found with id: " + categoryId);
        }
        return productRepository.findByCategoryId(categoryId).stream()
                .map(appMapper::toProductResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductResponse> getProductsByBrand(Long brandId) {
        // Ensure brand exists
        if (!brandRepository.existsById(brandId)) {
            throw new ResourceNotFoundException("Brand not found with id: " + brandId);
        }
        return productRepository.findByBrandId(brandId).stream()
                .map(appMapper::toProductResponse)
                .collect(Collectors.toList());
    }
}
