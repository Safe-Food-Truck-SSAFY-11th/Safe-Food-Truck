package com.safefoodtruck.sft.order.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

import com.safefoodtruck.sft.order.domain.Order;

public interface OrderRepository extends JpaRepository<Order, Integer>, OrderRepositoryCustom, QuerydslPredicateExecutor<Order> {
}
