package com.tuanle.watchecommerce.dto;

import com.tuanle.watchecommerce.enums.OrderStatus;
import java.time.LocalDateTime;
import java.util.List;

public class OrderResponse {
    private Long id;
    private double total;
    private LocalDateTime createdAt;
    private OrderStatus status;
    private List<OrderItemResponse> items;

    public OrderResponse() {}

    public OrderResponse(Long id, double total, LocalDateTime createdAt, OrderStatus status, List<OrderItemResponse> items) {
        this.id = id;
        this.total = total;
        this.createdAt = createdAt;
        this.status = status;
        this.items = items;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    public List<OrderItemResponse> getItems() {
        return items;
    }

    public void setItems(List<OrderItemResponse> items) {
        this.items = items;
    }
}
