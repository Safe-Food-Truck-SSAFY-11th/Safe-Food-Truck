package com.safefoodtruck.sft.order.repository;

import java.time.LocalDateTime;
import java.util.List;

import com.safefoodtruck.sft.order.domain.Order;
import com.safefoodtruck.sft.order.dto.response.CustomerOrderListResponseDto;
import com.safefoodtruck.sft.order.dto.response.WeeklyCustomerOrderSummaryResponseDto;

public interface OrderRepositoryCustom {
	Order findByOrderId(Integer orderId);
	List<Order> findOrdersByStoreOwnerEmail(String email);
	List<Order> findOrdersByStoreOwnerEmailAndOrderTimeBetween(String email, LocalDateTime start, LocalDateTime end);
	CustomerOrderListResponseDto findCustomerOrdersByEmail(String email);
	WeeklyCustomerOrderSummaryResponseDto findWeeklyCustomerOrderSummary(String email, LocalDateTime weekAgo);
}
