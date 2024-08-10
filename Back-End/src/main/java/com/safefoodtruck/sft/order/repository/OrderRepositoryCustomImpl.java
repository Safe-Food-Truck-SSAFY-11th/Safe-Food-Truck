package com.safefoodtruck.sft.order.repository;

import static com.safefoodtruck.sft.order.domain.OrderStatus.*;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.safefoodtruck.sft.menu.domain.QMenu;
import com.safefoodtruck.sft.menu.domain.QMenuImage;
import com.safefoodtruck.sft.order.domain.Order;
import com.safefoodtruck.sft.order.domain.QOrder;
import com.safefoodtruck.sft.order.domain.QOrderMenu;
import com.safefoodtruck.sft.order.dto.response.CustomerOrderByStoreSummaryDto;
import com.safefoodtruck.sft.order.dto.response.WeeklyCustomerOrderSummaryResponseDto;
import com.safefoodtruck.sft.review.domain.QReview;
import com.safefoodtruck.sft.store.domain.QStore;
import com.safefoodtruck.sft.store.domain.QStoreImage;

import jakarta.persistence.EntityManager;

@Repository
public class OrderRepositoryCustomImpl implements OrderRepositoryCustom {

	private final JPAQueryFactory queryFactory;

	public OrderRepositoryCustomImpl(EntityManager em) {
		this.queryFactory = new JPAQueryFactory(em);
	}

	@Override
	public List<Order> findByCustomerEmail(final String email) {
		QOrder order = QOrder.order;
		QReview review = QReview.review;
		QStore store = QStore.store;
		QStoreImage storeImage = QStoreImage.storeImage;
		QMenu menu = QMenu.menu;
		QMenuImage menuImage = QMenuImage.menuImage;
		QOrderMenu qOrderMenu = QOrderMenu.orderMenu;

		return queryFactory.selectFrom(order)
			.join(order.store, store).fetchJoin()
			.leftJoin(store.storeImage, storeImage).fetchJoin()
			.leftJoin(order.orderMenuList, qOrderMenu).fetchJoin()
			.leftJoin(qOrderMenu.menu, menu).fetchJoin()
			.leftJoin(menu.menuImage, menuImage).fetchJoin()
			.leftJoin(order.review, review).fetchJoin()
			.where(order.customer.email.eq(email))
			.fetch();
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
	public List<Order> findOrdersByStoreOwnerEmailAndOrderTimeBetween(String email,
		LocalDateTime start, LocalDateTime end) {
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
	public WeeklyCustomerOrderSummaryResponseDto findWeeklyCustomerOrderSummary(String email,
		LocalDateTime weekAgo) {
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
			.where(
				order.customer.email.eq(email)
					.and(order.orderTime.goe(weekAgo))
					.and(order.status.eq(ACCEPTED.get()))
			)
			.groupBy(order.store.id, store.name, store.storeType)
			.orderBy(order.amount.sum().desc(), order.count().desc())
			.fetch();

		// 일주일간 총 주문 횟수와 총 금액 조회
		Long weeklyOrderCount = queryFactory
			.select(order.count())
			.from(order)
			.where(
				order.customer.email.eq(email)
					.and(order.orderTime.goe(weekAgo))
					.and(order.status.eq(ACCEPTED.get()))
			)
			.fetchOne();

		Integer weeklyTotalAmount = queryFactory
			.select(order.amount.sum().intValue())
			.from(order)
			.where(
				order.customer.email.eq(email)
					.and(order.orderTime.goe(weekAgo))
					.and(order.status.eq(ACCEPTED.get()))
			)
			.fetchOne();

		return WeeklyCustomerOrderSummaryResponseDto.of(weeklyOrderCount, weeklyTotalAmount,
			storeOrderSummaries);
	}

}
