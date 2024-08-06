package com.safefoodtruck.sft.order.service;

import java.util.List;

import com.safefoodtruck.sft.order.dto.request.OrderRegistRequestDto;
import com.safefoodtruck.sft.order.dto.response.CustomerOrderListResponseDto;
import com.safefoodtruck.sft.order.dto.response.OrderDetailResponseDto;
import com.safefoodtruck.sft.order.dto.response.OrderListResponseDto;
import com.safefoodtruck.sft.order.dto.response.OrderRegistResponseDto;
import com.safefoodtruck.sft.order.dto.response.OrderSummaryResponseDto;

public interface OrderService {
    OrderRegistResponseDto order(OrderRegistRequestDto orderRegistRequestDto);
    String acceptOrder(Integer orderId);
    String rejectOrder(Integer orderId);
    String completeOrder(Integer orderId);
    CustomerOrderListResponseDto findCustomerOrderList();
    OrderListResponseDto findStoreOrderList();
    OrderDetailResponseDto findOrderDetail(Integer orderId);
    List<OrderSummaryResponseDto> getWeeklyOrderSummary();
}
