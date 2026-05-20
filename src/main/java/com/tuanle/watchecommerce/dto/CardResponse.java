package com.tuanle.watchecommerce.dto;

import java.util.List;

public class CardResponse {
    private Long id;
    private List<CardItemResponse> items;
    private double totalAmount;

    public CardResponse() {}

    public CardResponse(Long id, List<CardItemResponse> items, double totalAmount) {
        this.id = id;
        this.items = items;
        this.totalAmount = totalAmount;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<CardItemResponse> getItems() {
        return items;
    }

    public void setItems(List<CardItemResponse> items) {
        this.items = items;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }
}
