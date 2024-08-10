package com.safefoodtruck.sft.order.repository;

import static com.safefoodtruck.sft.order.domain.OrderStatus.*;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQuery;
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
	private final QOrder order = QOrder.order;
	private final QReview review = QReview.review;
	private final QStore store = QStore.store;
	private final QStoreImage storeImage = QStoreImage.storeImage;
	private final QMenu menu = QMenu.menu;
	private final QMenuImage menuImage = QMenuImage.menuImage;
	private final QOrderMenu qOrderMenu = QOrderMenu.orderMenu;

	public OrderRepositoryCustomImpl(EntityManager em) {
		this.queryFactory = new JPAQueryFactory(em);
	}

	@Override
	public Order findByOrderId(final Integer orderId) {
		return baseOrderQuery()
			.where(order.id.eq(orderId))
			.fetchOne();
	}

	@Override
	public List<Order> findByCustomerEmail(final String email) {
		return baseOrderQuery()
			.where(order.customer.email.eq(email))
			.fetch();
	}

	@Override
	public List<Order> findOrdersByStoreOwnerEmail(String email) {
		return baseOrderQuery()
			.where(order.store.owner.email.eq(email))
			.fetch();
	}

	@Override
	public List<Order> findOrdersByStoreOwnerEmailAndOrderTimeBetween(
		String email, LocalDateTime start, LocalDateTime end) {
		return baseOrderQuery()
			.where(
				order.store.owner.email.eq(email)
					.and(order.cookingStatus.eq(COMPLETED.get()))
					.and(order.orderTime.between(start, end))
			)
			.fetch();
	}

	@Override
	public WeeklyCustomerOrderSummaryResponseDto findWeeklyCustomerOrderSummary(
		String email, LocalDateTime weekAgo) {

		List<CustomerOrderByStoreSummaryDto> storeOrderSummaries = getCustomerOrderSummaryByStore(email, weekAgo);

		Long weeklyOrderCount = getWeeklyOrderCount(email, weekAgo);
		Integer weeklyTotalAmount = getWeeklyTotalAmount(email, weekAgo);

		return WeeklyCustomerOrderSummaryResponseDto.of(weeklyOrderCount, weeklyTotalAmount, storeOrderSummaries);
	}

	private List<CustomerOrderByStoreSummaryDto> getCustomerOrderSummaryByStore(String email, LocalDateTime weekAgo) {
		return queryFactory
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
	}

	private Long getWeeklyOrderCount(String email, LocalDateTime weekAgo) {
		return queryFactory
			.select(order.count())
			.from(order)
			.where(
				order.customer.email.eq(email)
					.and(order.orderTime.goe(weekAgo))
					.and(order.status.eq(ACCEPTED.get()))
			)
			.fetchOne();
	}

	private Integer getWeeklyTotalAmount(String email, LocalDateTime weekAgo) {
		return queryFactory
			.select(order.amount.sum().intValue())
			.from(order)
			.where(
				order.customer.email.eq(email)
					.and(order.orderTime.goe(weekAgo))
					.and(order.status.eq(ACCEPTED.get()))
			)
			.fetchOne();
	}

	private JPAQuery<Order> baseOrderQuery() {
		return queryFactory.selectFrom(order)
			.leftJoin(order.review, review).fetchJoin()
			.leftJoin(order.store, store).fetchJoin()
			.leftJoin(store.storeImage, storeImage).fetchJoin()
			.leftJoin(order.orderMenuList, qOrderMenu).fetchJoin()
			.leftJoin(qOrderMenu.menu, menu).fetchJoin()
			.leftJoin(menu.menuImage, menuImage).fetchJoin();
	}
}
