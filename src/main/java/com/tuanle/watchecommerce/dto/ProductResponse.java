package com.tuanle.watchecommerce.dto;

public class ProductResponse {
    private Long id;
    private String name;
    private double price;
    private int stock;
    private String brandName;
    private String categoryName;

    public ProductResponse() {}

    public ProductResponse(Long id, String name, double price, int stock, String brandName, String categoryName) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.stock = stock;
        this.brandName = brandName;
        this.categoryName = categoryName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getBrandName() {
        return brandName;
    }

    public void setBrandName(String brandName) {
        this.brandName = brandName;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }
}
