package com.safefoodtruck.sft.order.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.safefoodtruck.sft.order.domain.OrderMenu;

public interface OrderMenuRepository extends JpaRepository<OrderMenu, Integer> {
}
