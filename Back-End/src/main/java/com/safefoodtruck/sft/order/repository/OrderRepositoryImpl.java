package com.safefoodtruck.sft.order.repository;

import static com.safefoodtruck.sft.order.domain.OrderStatus.COMPLETED;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.safefoodtruck.sft.order.domain.Order;
import com.safefoodtruck.sft.order.domain.QOrder;
import com.safefoodtruck.sft.order.dto.response.CustomerOrderByStoreSummaryDto;
import com.safefoodtruck.sft.order.dto.response.WeeklyCustomerOrderSummaryResponseDto;
import com.safefoodtruck.sft.store.domain.QStore;
import jakarta.persistence.EntityManager;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.stereotype.Repository;

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
				.and(order.cookingStatus.eq(COMPLETED.get()))
				.and(order.orderTime.between(start, end)))
			.fetch();
	}

	@Override
	public WeeklyCustomerOrderSummaryResponseDto findWeeklyCustomerOrderSummary(String email, LocalDateTime weekAgo) {
		QOrder order = QOrder.order;
		QStore store = QStore.store;

		// 가게별 주문 횟수와 금액 조회
		List<CustomerOrderByStoreSummaryDto> storeOrderSummaries = queryFactory
			.select(Projections.constructor(CustomerOrderByStoreSummaryDto.class,
				order.store.id,
				store.name,
				store.storeType,
				order.count(),
				order.amount.sum().intValue()))
			.from(order)
			.join(order.store, store)
			.where(order.customer.email.eq(email).and(order.orderTime.goe(weekAgo)))
			.groupBy(order.store.id, store.name, store.storeType)
			.orderBy(order.amount.sum().desc(), order.count().desc())
			.fetch();

		// 일주일간 총 주문 횟수와 총 금액 조회
		Long weeklyOrderCount = queryFactory
			.select(order.count())
			.from(order)
			.where(order.customer.email.eq(email).and(order.orderTime.goe(weekAgo)))
			.fetchOne();

		Integer weeklyTotalAmount = queryFactory
			.select(order.amount.sum().intValue())
			.from(order)
			.where(order.customer.email.eq(email).and(order.orderTime.goe(weekAgo)))
			.fetchOne();

		return WeeklyCustomerOrderSummaryResponseDto.of(weeklyOrderCount, weeklyTotalAmount, storeOrderSummaries);
	}
}
