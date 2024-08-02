package com.safefoodtruck.sft.order.repository;

import com.safefoodtruck.sft.order.domain.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Integer> {

}
