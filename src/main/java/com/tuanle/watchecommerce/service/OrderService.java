package com.tuanle.watchecommerce.service;

import com.tuanle.watchecommerce.dto.OrderRequest;
import com.tuanle.watchecommerce.dto.OrderResponse;

import java.util.List;

public interface OrderService {
    OrderResponse createOrder(Long userId, OrderRequest orderRequest);
    OrderResponse getOrderById(Long orderId);
    List<OrderResponse> getOrdersByUserId(Long userId);
    List<OrderResponse> getAllOrders();
    OrderResponse updateOrderStatus(Long orderId, String status);
    OrderResponse cancelOrder(Long orderId);
}
