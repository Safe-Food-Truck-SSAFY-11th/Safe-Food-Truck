package com.safefoodtruck.sft.order.service;

import com.safefoodtruck.sft.order.dto.response.CustomerPreparingOrderListResponseDto;
import java.util.List;

import com.safefoodtruck.sft.order.dto.request.OrderRegistRequestDto;
import com.safefoodtruck.sft.order.dto.response.CustomerOrderListResponseDto;
import com.safefoodtruck.sft.order.dto.response.OrderDetailResponseDto;
import com.safefoodtruck.sft.order.dto.response.OrderRegistResponseDto;
import com.safefoodtruck.sft.order.dto.response.OrderSummaryResponseDto;
import com.safefoodtruck.sft.order.dto.response.OwnerOrderListResponseDto;
import com.safefoodtruck.sft.order.dto.response.WeeklyCustomerOrderSummaryResponseDto;

public interface OrderService {
    OrderRegistResponseDto registOrder(OrderRegistRequestDto orderRegistRequestDto);
    String acceptOrder(Integer orderId);
    String rejectOrder(Integer orderId);
    String completeOrder(Integer orderId);
    CustomerOrderListResponseDto findCustomerOrderList();
    OwnerOrderListResponseDto findStoreOrderList();
    CustomerPreparingOrderListResponseDto findAcceptedPreparingOrders();
    OrderDetailResponseDto findOrderDetail(Integer orderId);
    List<OrderSummaryResponseDto> getWeeklyOrderSummary();
    WeeklyCustomerOrderSummaryResponseDto getWeeklyCustomerOrderSummary();
}
