package com.tuanle.watchecommerce.service;

import com.tuanle.watchecommerce.entity.Brand;
import java.util.List;

public interface BrandService {
    Brand createBrand(Brand brand);
    Brand getBrandById(Long id);
    List<Brand> getAllBrands();
    Brand updateBrand(Long id, Brand brandDetails);
    void deleteBrand(Long id);
}
