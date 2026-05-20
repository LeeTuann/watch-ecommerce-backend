package com.tuanle.watchecommerce.dto;

public class ProductRequest {
    private String name;
    private double price;
    private int stock;
    private Long brandId;
    private Long categoryId;

    public ProductRequest() {}

    public ProductRequest(String name, double price, int stock, Long brandId, Long categoryId) {
        this.name = name;
        this.price = price;
        this.stock = stock;
        this.brandId = brandId;
        this.categoryId = categoryId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public Long getBrandId() {
        return brandId;
    }

    public void setBrandId(Long brandId) {
        this.brandId = brandId;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }
}
