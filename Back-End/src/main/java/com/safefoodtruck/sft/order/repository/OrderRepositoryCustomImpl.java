package com.safefoodtruck.sft.order.repository;

import static com.querydsl.core.types.Projections.*;
import static com.safefoodtruck.sft.menu.domain.QMenu.*;
import static com.safefoodtruck.sft.menu.domain.QMenuImage.*;
import static com.safefoodtruck.sft.order.domain.OrderStatus.*;
import static com.safefoodtruck.sft.order.domain.QOrder.*;
import static com.safefoodtruck.sft.order.domain.QOrderMenu.*;
import static com.safefoodtruck.sft.reply.domain.QReply.*;
import static com.safefoodtruck.sft.review.domain.QReview.*;
import static com.safefoodtruck.sft.store.domain.QStore.*;
import static com.safefoodtruck.sft.store.domain.QStoreImage.*;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.safefoodtruck.sft.menu.dto.MenuImageDto;
import com.safefoodtruck.sft.menu.dto.response.MenuResponseDto;
import com.safefoodtruck.sft.order.domain.Order;
import com.safefoodtruck.sft.order.dto.response.CustomerOrderByStoreSummaryDto;
import com.safefoodtruck.sft.order.dto.response.CustomerOrderListResponseDto;
import com.safefoodtruck.sft.order.dto.response.CustomerOrderResponseDto;
import com.safefoodtruck.sft.order.dto.response.WeeklyCustomerOrderSummaryResponseDto;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class OrderRepositoryCustomImpl implements OrderRepositoryCustom {

	private final JPAQueryFactory queryFactory;

	@Override
	public Order findByOrderId(final Integer orderId) {
		return baseOrderQuery().where(order.id.eq(orderId)).fetchOne();
	}

	@Override
	public List<Order> findOrdersByStoreOwnerEmail(String email) {
		return baseOrderQuery().where(order.store.owner.email.eq(email)).fetch();
	}

	@Override
	public List<Order> findOrdersByStoreOwnerEmailAndOrderTimeBetween(String email,
		LocalDateTime start, LocalDateTime end) {
		return baseOrderQuery().where(order.store.owner.email.eq(email)
			.and(order.cookingStatus.eq(COMPLETED.get()))
			.and(order.orderTime.between(start, end))).fetch();
	}

	@Override
	public CustomerOrderListResponseDto findCustomerOrdersByEmail(String email) {
		List<CustomerOrderResponseDto> customerOrderResponseDtos = queryFactory.select(
				constructor(CustomerOrderResponseDto.class, order.id.as("orderId"),
					order.store.id.as("storeId"), order.store.name.as("storeName"), order.status,
					order.amount, Projections.list(
						constructor(MenuResponseDto.class, menu.id.as("menuId"), menu.name,
							menu.price, menu.description,
							constructor(MenuImageDto.class, menu.menuImage.menu,
								menu.menuImage.savedUrl, menu.menuImage.savedPath)))))
			.from(order)
			.leftJoin(order.orderMenuList, orderMenu)
			.leftJoin(orderMenu.menu, menu)
			.where(order.customer.email.eq(email))
			.fetch();

		return CustomerOrderListResponseDto.fromEntity(customerOrderResponseDtos);
	}

	@Override
	public WeeklyCustomerOrderSummaryResponseDto findWeeklyCustomerOrderSummary(String email,
		LocalDateTime weekAgo) {

		List<CustomerOrderByStoreSummaryDto> storeOrderSummaries = getCustomerOrderSummaryByStore(
			email, weekAgo);

		Long weeklyOrderCount = getWeeklyOrderCount(email, weekAgo);
		Integer weeklyTotalAmount = getWeeklyTotalAmount(email, weekAgo);

		return WeeklyCustomerOrderSummaryResponseDto.of(weeklyOrderCount, weeklyTotalAmount,
			storeOrderSummaries);
	}

	private List<CustomerOrderByStoreSummaryDto> getCustomerOrderSummaryByStore(String email,
		LocalDateTime weekAgo) {
		return queryFactory.select(
				constructor(CustomerOrderByStoreSummaryDto.class, order.store.id, store.name,
					store.storeType, order.count(), order.amount.sum().intValue()))
			.from(order)
			.join(order.store, store)
			.where(order.customer.email.eq(email)
				.and(order.orderTime.goe(weekAgo))
				.and(order.status.eq(ACCEPTED.get())))
			.groupBy(order.store.id, store.name, store.storeType)
			.orderBy(order.amount.sum().desc(), order.count().desc())
			.fetch();
	}

	private Long getWeeklyOrderCount(String email, LocalDateTime weekAgo) {
		return queryFactory.select(order.count())
			.from(order)
			.where(order.customer.email.eq(email)
				.and(order.orderTime.goe(weekAgo))
				.and(order.status.eq(ACCEPTED.get())))
			.fetchOne();
	}

	private Integer getWeeklyTotalAmount(String email, LocalDateTime weekAgo) {
		return queryFactory.select(order.amount.sum().intValue())
			.from(order)
			.where(order.customer.email.eq(email)
				.and(order.orderTime.goe(weekAgo))
				.and(order.status.eq(ACCEPTED.get())))
			.fetchOne();
	}

	private JPAQuery<Order> baseOrderQuery() {
		return queryFactory.selectFrom(order)
			.leftJoin(order.review, review)
			.fetchJoin()
			.leftJoin(review.reply, reply)
			.fetchJoin()
			.leftJoin(order.store, store)
			.fetchJoin()
			.leftJoin(store.storeImage, storeImage)
			.fetchJoin()
			.leftJoin(order.orderMenuList, orderMenu)
			.fetchJoin()
			.leftJoin(orderMenu.menu, menu)
			.fetchJoin()
			.leftJoin(menu.menuImage, menuImage)
			.fetchJoin();
	}
}
