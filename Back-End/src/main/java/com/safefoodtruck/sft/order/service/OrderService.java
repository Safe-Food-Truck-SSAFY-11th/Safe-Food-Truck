package com.safefoodtruck.sft.order.service;

import com.safefoodtruck.sft.order.dto.request.OrderRegistRequestDto;
import com.safefoodtruck.sft.order.dto.response.OrderDetailResponseDto;
import com.safefoodtruck.sft.order.dto.response.OrderListResponseDto;
import com.safefoodtruck.sft.order.dto.response.OrderRegistResponseDto;

public interface OrderService {
    OrderRegistResponseDto order(OrderRegistRequestDto orderRegistRequestDto);
    String acceptOrder(Integer orderId);
    String rejectOrder(Integer orderId);
    String completeOrder(Integer orderId);
    OrderListResponseDto findCustomerOrderList();
    OrderListResponseDto findStoreOrderList();
    OrderDetailResponseDto findOrderDetail(Integer orderId);
}
