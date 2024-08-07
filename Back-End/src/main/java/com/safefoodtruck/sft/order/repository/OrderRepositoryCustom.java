package com.safefoodtruck.sft.order.repository;

import java.time.LocalDateTime;
import java.util.List;

import com.safefoodtruck.sft.order.domain.Order;

public interface OrderRepositoryCustom {
	List<Order> findOrdersByStoreOwnerEmail(String email);
	List<Order> findOrdersByStoreOwnerEmailAndOrderTimeBetween(String email, LocalDateTime start, LocalDateTime end);
}
