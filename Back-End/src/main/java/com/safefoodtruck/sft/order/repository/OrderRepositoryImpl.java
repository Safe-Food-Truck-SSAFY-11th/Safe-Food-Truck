package com.safefoodtruck.sft.order.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.safefoodtruck.sft.order.domain.Order;
import com.safefoodtruck.sft.order.domain.QOrder;

import jakarta.persistence.EntityManager;

@Repository
public class OrderRepositoryImpl implements OrderRepositoryCustom {

	private final JPAQueryFactory queryFactory;

	public OrderRepositoryImpl(EntityManager em) {
		this.queryFactory = new JPAQueryFactory(em);
	}

	@Override
	public List<Order> findOrdersByStoreOwnerEmail(String email) {
		QOrder order = QOrder.order;

		return queryFactory.selectFrom(order)
			.join(order.store).fetchJoin()
			.where(order.store.owner.email.eq(email))
			.fetch();
	}

	@Override
	public List<Order> findOrdersByStoreOwnerEmailAndOrderTimeBetween(String email, LocalDateTime start, LocalDateTime end) {
		QOrder order = QOrder.order;

		return queryFactory.selectFrom(order)
			.join(order.store).fetchJoin()
			.join(order.orderMenuList).fetchJoin()
			.where(order.store.owner.email.eq(email)
				.and(order.orderTime.between(start, end)))
			.fetch();
	}
}
