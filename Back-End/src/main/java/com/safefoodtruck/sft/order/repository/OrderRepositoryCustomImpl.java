package com.safefoodtruck.sft.order.repository;

import static com.querydsl.core.types.Projections.constructor;
import static com.safefoodtruck.sft.menu.domain.QMenu.menu;
import static com.safefoodtruck.sft.menu.domain.QMenuImage.menuImage;
import static com.safefoodtruck.sft.order.domain.OrderStatus.ACCEPTED;
import static com.safefoodtruck.sft.order.domain.OrderStatus.COMPLETED;
import static com.safefoodtruck.sft.order.domain.OrderStatus.PREPARING;
import static com.safefoodtruck.sft.order.domain.QOrder.order;
import static com.safefoodtruck.sft.order.domain.QOrderMenu.orderMenu;
import static com.safefoodtruck.sft.reply.domain.QReply.reply;
import static com.safefoodtruck.sft.review.domain.QReview.review;
import static com.safefoodtruck.sft.store.domain.QStore.store;
import static com.safefoodtruck.sft.store.domain.QStoreImage.storeImage;

import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.safefoodtruck.sft.menu.domain.MenuType;
import com.safefoodtruck.sft.menu.exception.MenuNotFoundException;
import com.safefoodtruck.sft.menu.repository.MenuRepository;
import com.safefoodtruck.sft.order.domain.Order;
import com.safefoodtruck.sft.order.dto.request.OrderMenuRequestDto;
import com.safefoodtruck.sft.order.dto.response.CustomerOrderByStoreSummaryDto;
import com.safefoodtruck.sft.order.dto.response.CustomerOrderListResponseDto;
import com.safefoodtruck.sft.order.dto.response.CustomerOrderResponseDto;
import com.safefoodtruck.sft.order.dto.response.CustomerPreparingOrderListResponseDto;
import com.safefoodtruck.sft.order.dto.response.CustomerPreparingOrderResponseDto;
import com.safefoodtruck.sft.order.dto.response.WeeklyCustomerOrderSummaryResponseDto;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class OrderRepositoryCustomImpl implements OrderRepositoryCustom {

    private final JPAQueryFactory queryFactory;
    private final MenuRepository menuRepository;

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
        List<Order> orders = baseOrderQuery()
            .where(order.customer.email.eq(email))
            .fetch();

        List<CustomerOrderResponseDto> customerOrderResponseDtos = orders.stream()
            .map(CustomerOrderResponseDto::fromEntity)
            .toList();

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

    @Override
    public CustomerPreparingOrderListResponseDto findAcceptedPreparingOrders(String email) {
        List<Order> orders = queryFactory.selectFrom(order)
            .where(order.customer.email.eq(email)
                .and(order.status.eq(ACCEPTED.get()))
                .and(order.cookingStatus.eq(PREPARING.get())))
            .fetch();

        List<CustomerPreparingOrderResponseDto> customerPreparingOrderResponseDtos = orders.stream()
            .map(o -> {
                String orderTitle = createOrderTitle(o.getOrderMenuList().stream()
                    .map(menu -> new OrderMenuRequestDto(menu.getMenu().getId(), menu.getCount()))
                    .toList());

                return CustomerPreparingOrderResponseDto.builder()
                    .orderId(o.getId())
                    .storeId(o.getStore().getId())
                    .status(o.getStatus())
                    .cookingStatus(o.getCookingStatus())
                    .orderTime(o.getOrderTime())
                    .orderTitle(orderTitle)
                    .build();
            }).toList();

        return CustomerPreparingOrderListResponseDto.builder()
            .count(customerPreparingOrderResponseDtos.size())
            .customerPreparingOrderResponseDtos(customerPreparingOrderResponseDtos)
            .build();
    }

    private String createOrderTitle(List<OrderMenuRequestDto> menuList) {
        StringBuilder orderTitleBuilder = new StringBuilder();

        String firstMenuName = menuRepository.findById(menuList.get(0).menuId())
            .orElseThrow(MenuNotFoundException::new).getName();
        Integer firstMenuCount = menuList.get(0).count();

        String unit = MenuType.getUnitByMenuName(firstMenuName);

        orderTitleBuilder.append(firstMenuName)
            .append(" ")
            .append(firstMenuCount)
            .append(unit);

        if (menuList.size() > 1) {
            orderTitleBuilder.append(" 외 ")
                .append(menuList.size() - 1)
                .append("개");
        }

        return orderTitleBuilder.toString();
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