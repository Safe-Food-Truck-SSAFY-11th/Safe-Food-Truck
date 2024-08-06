package com.safefoodtruck.sft.order.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.safefoodtruck.sft.order.domain.Order;

public interface OrderRepository extends JpaRepository<Order, Integer> {

	@Query("SELECT o FROM Order o WHERE o.customer.email = :email")
	List<Order> findByCustomerEmail(@Param("email") String email);

	@Query("SELECT o FROM Order o JOIN o.store s WHERE s.owner.email = :email")
	List<Order> findByStoreOwnerEmail(@Param("email") String email);

	@Query("SELECT o FROM Order o JOIN FETCH o.orderMenuList WHERE o.store.owner.email = :email AND o.orderTime BETWEEN :start AND :end")
	List<Order> findByStoreOwnerEmailAndOrderTimeBetween(String email, LocalDateTime start, LocalDateTime end);
}
