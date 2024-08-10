package com.safefoodtruck.sft.order.repository;

import java.time.LocalDateTime;
import java.util.List;

import com.safefoodtruck.sft.order.domain.Order;
import com.safefoodtruck.sft.order.dto.response.WeeklyCustomerOrderSummaryResponseDto;

public interface OrderRepositoryCustom {
	List<Order> findByCustomerEmail(String email);
	List<Order> findOrdersByStoreOwnerEmail(String email);
	List<Order> findOrdersByStoreOwnerEmailAndOrderTimeBetween(String email, LocalDateTime start, LocalDateTime end);
	WeeklyCustomerOrderSummaryResponseDto findWeeklyCustomerOrderSummary(String email, LocalDateTime weekAgo);
}
