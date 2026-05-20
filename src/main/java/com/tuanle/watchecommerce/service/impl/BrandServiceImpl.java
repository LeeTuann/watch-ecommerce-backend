package com.tuanle.watchecommerce.service.impl;

import com.tuanle.watchecommerce.entity.Brand;
import com.tuanle.watchecommerce.repository.BrandRepository;
import com.tuanle.watchecommerce.service.BrandService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class BrandServiceImpl implements BrandService {

    private final BrandRepository brandRepository;

    public BrandServiceImpl(BrandRepository brandRepository) {
        this.brandRepository = brandRepository;
    }

    @Override
    public Brand createBrand(Brand brand) {
        if (brand == null) {
            throw new IllegalArgumentException("Brand cannot be null");
        }
        return brandRepository.save(brand);
    }

    @Override
    @Transactional(readOnly = true)
    public Brand getBrandById(Long id) {
        return brandRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Brand not found with id: " + id));
    }

    @Override
    @Transactional(readOnly = true)
    public List<Brand> getAllBrands() {
        return brandRepository.findAll();
    }

    @Override
    public Brand updateBrand(Long id, Brand brandDetails) {
        if (brandDetails == null) {
            throw new IllegalArgumentException("Brand details cannot be null");
        }
        Brand brand = getBrandById(id);
        brand.setName(brandDetails.getName());
        return brandRepository.save(brand);
    }

    @Override
    public void deleteBrand(Long id) {
        Brand brand = getBrandById(id);
        brandRepository.delete(brand);
    }
}
