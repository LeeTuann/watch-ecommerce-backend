package com.tuanle.watchecommerce.config;

import com.tuanle.watchecommerce.entity.Brand;
import com.tuanle.watchecommerce.entity.Category;
import com.tuanle.watchecommerce.entity.Product;
import com.tuanle.watchecommerce.repository.BrandRepository;
import com.tuanle.watchecommerce.repository.CategoryRepository;
import com.tuanle.watchecommerce.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private final BrandRepository brandRepository;
    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;

    public DataSeeder(BrandRepository brandRepository,
                      CategoryRepository categoryRepository,
                      ProductRepository productRepository) {
        this.brandRepository = brandRepository;
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Only seed if brand tables are empty
        if (brandRepository.count() == 0 && categoryRepository.count() == 0 && productRepository.count() == 0) {
            System.out.println("--- Seeding Luxury Watch Catalog Seed Data ---");

            // 1. Brands
            List<Brand> brands = new ArrayList<>();
            String[] brandNames = {"Rolex", "Omega", "Audemars Piguet", "Patek Philippe"};
            for (String name : brandNames) {
                Brand b = new Brand();
                b.setName(name);
                brands.add(brandRepository.save(b));
            }

            // 2. Categories
            List<Category> categories = new ArrayList<>();
            String[] catNames = {"Sports", "Classic", "Chronograph", "Grand Complications"};
            for (String name : catNames) {
                Category c = new Category();
                c.setName(name);
                categories.add(categoryRepository.save(c));
            }

            // Find entities by index/convenience
            Brand rolex = brands.get(0);
            Brand omega = brands.get(1);
            Brand ap = brands.get(2);
            Brand patek = brands.get(3);

            Category sports = categories.get(0);
            Category classic = categories.get(1);
            Category chrono = categories.get(2);

            // 3. Products
            createProduct("Submariner Date 126610LN", 10500.00, 5, rolex, sports);
            createProduct("Cosmograph Daytona Eye of Tiger", 14500.00, 3, rolex, chrono);
            createProduct("Speedmaster Professional Moonwatch", 7600.00, 12, omega, chrono);
            createProduct("Seamaster Diver 300M Co-Axial", 5900.00, 8, omega, sports);
            createProduct("Royal Oak 'Jumbo' Extra-Thin", 24800.00, 2, ap, classic);
            createProduct("Nautilus 5711 Blue Dial", 32000.00, 1, patek, classic);

            System.out.println("--- Seeding Complete: Watch Store Seeded ---");
        }
    }

    private void createProduct(String name, double price, int stock, Brand brand, Category category) {
        Product p = new Product();
        p.setName(name);
        p.setPrice(price);
        p.setStock(stock);
        p.setBrand(brand);
        p.setCategory(category);
        productRepository.save(p);
    }
}
