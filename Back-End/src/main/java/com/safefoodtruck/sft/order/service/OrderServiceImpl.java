package com.safefoodtruck.sft.order.service;

import static com.safefoodtruck.sft.order.domain.OrderStatus.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.safefoodtruck.sft.common.util.MemberInfo;
import com.safefoodtruck.sft.member.domain.Member;
import com.safefoodtruck.sft.member.repository.MemberRepository;
import com.safefoodtruck.sft.menu.domain.Menu;
import com.safefoodtruck.sft.menu.exception.MenuNotFoundException;
import com.safefoodtruck.sft.menu.repository.MenuRepository;
import com.safefoodtruck.sft.order.domain.Order;
import com.safefoodtruck.sft.order.domain.OrderMenu;
import com.safefoodtruck.sft.order.dto.request.OrderMenuRequestDto;
import com.safefoodtruck.sft.order.dto.request.OrderRegistRequestDto;
import com.safefoodtruck.sft.order.dto.response.OrderDetailResponseDto;
import com.safefoodtruck.sft.order.dto.response.OrderListResponseDto;
import com.safefoodtruck.sft.order.dto.response.OrderRegistResponseDto;
import com.safefoodtruck.sft.order.exception.AlreadyCompletedOrderException;
import com.safefoodtruck.sft.order.exception.AlreadyProcessedOrderException;
import com.safefoodtruck.sft.order.exception.OrderNotFoundException;
import com.safefoodtruck.sft.order.repository.OrderMenuRepository;
import com.safefoodtruck.sft.order.repository.OrderRepository;
import com.safefoodtruck.sft.store.domain.Store;
import com.safefoodtruck.sft.store.exception.StoreNotFoundException;
import com.safefoodtruck.sft.store.repository.StoreRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

	private final MemberRepository memberRepository;
	private final StoreRepository storeRepository;
	private final OrderRepository orderRepository;
	private final OrderMenuRepository orderMenuRepository;
	private final MenuRepository menuRepository;

	@Override
	public OrderRegistResponseDto order(final OrderRegistRequestDto orderRegistRequestDto) {
		String email = MemberInfo.getEmail();
		Member customer = memberRepository.findByEmail(email);
		Store store = storeRepository.findById(orderRegistRequestDto.storeId())
			.orElseThrow(StoreNotFoundException::new);

		Order order = createOrder(orderRegistRequestDto, customer, store);
		Order savedOrder = orderRepository.save(order);

		List<OrderMenuRequestDto> menuList = orderRegistRequestDto.menuList();
		List<OrderMenu> orderMenuList = createOrderMenus(savedOrder, menuList);

		orderMenuRepository.saveAll(orderMenuList);

		return createOrderRegistResponseDto(savedOrder, menuList);
	}

	private Order createOrder(OrderRegistRequestDto orderRegistRequestDto, Member customer, Store store) {
		return Order.builder()
			.customer(customer)
			.store(store)
			.request(orderRegistRequestDto.request())
			.status(PENDING.get())
			.cookingStatus(PREPARING.get())
			.orderTime(LocalDateTime.now())
			.build();
	}

	private List<OrderMenu> createOrderMenus(Order savedOrder, List<OrderMenuRequestDto> menuList) {
		return menuList.stream()
			.map(menuRequestDto -> {
				Menu menu = menuRepository.findById(menuRequestDto.menuId())
					.orElseThrow(MenuNotFoundException::new);

				OrderMenu orderMenu = OrderMenu.builder()
					.menu(menu)
					.count(menuRequestDto.count())
					.build();

				savedOrder.addOrderMenu(orderMenu);
				return orderMenu;
			}).toList();
	}

	private OrderRegistResponseDto createOrderRegistResponseDto(Order savedOrder, List<OrderMenuRequestDto> menuList) {
		String orderTitle = createOrderTitle(menuList);
		Integer totalQuantity = menuList.stream()
			.mapToInt(OrderMenuRequestDto::count)
			.sum();

		int totalAmount = menuList.stream()
			.mapToInt(menuRequestDto -> menuRepository.findById(menuRequestDto.menuId())
				.orElseThrow(MenuNotFoundException::new).getPrice() * menuRequestDto.count())
			.sum();

		return OrderRegistResponseDto.builder()
			.order(savedOrder)
			.menuName(orderTitle)
			.totalQuantity(totalQuantity)
			.totalAmount(totalAmount)
			.build();
	}

	private String createOrderTitle(List<OrderMenuRequestDto> menuList) {
		String orderTitle = menuList.stream()
			.map(menuRequestDto -> menuRepository.findById(menuRequestDto.menuId())
				.orElseThrow(MenuNotFoundException::new).getName())
			.collect(Collectors.joining(", "));

		if (menuList.size() > 1) {
			orderTitle = orderTitle.split(", ")[0] + " 외 " + (menuList.size() - 1) + "개";
		}

		return orderTitle;
	}

	@Override
	public String acceptOrder(Integer orderId) {
		Order order = getOrder(orderId);
		if (order.isInValidRequest()) {
			throw new AlreadyProcessedOrderException();
		}
		order.acceptOrder();
		return order.getStatus();
	}

	@Override
	public String rejectOrder(Integer orderId) {
		Order order = getOrder(orderId);
		if (order.isInValidRequest()) {
			throw new AlreadyProcessedOrderException();
		}
		order.rejectOrder();
		return order.getStatus();
	}

	@Override
	public String completeOrder(final Integer orderId) {
		Order order = getOrder(orderId);
		if (order.isAlreadyCompletedOrder()) {
			throw new AlreadyCompletedOrderException();
		}
		order.completeOrder();
		return order.getCookingStatus();
	}

	private Order getOrder(Integer orderId) {
		return orderRepository.findById(orderId).orElseThrow(OrderNotFoundException::new);
	}

	public OrderListResponseDto findCustomerOrderList() {
		String email = MemberInfo.getEmail();
		List<Order> orders = orderRepository.findByCustomerEmail(email);

		return createOrderListResponseDto(orders);
	}

	@Override
	public OrderListResponseDto findStoreOrderList() {
		String email = MemberInfo.getEmail();
		List<Order> orders = orderRepository.findByStoreOwnerEmail(email);

		return createOrderListResponseDto(orders);
	}

	@Override
	public OrderDetailResponseDto findOrderDetail(Integer orderId) {
		Order order = orderRepository.findById(orderId).orElseThrow(OrderNotFoundException::new);

		return OrderDetailResponseDto.builder()
			.orderId(order.getId())
			.customerEmail(order.getCustomerEmail())
			.storeId(order.getStoreId())
			.orderMenuList(order.getOrderMenuList())
			.request(order.getRequest())
			.status(order.getStatus())
			.cookingStatus(order.getCookingStatus())
			.orderTime(order.getOrderTime())
			.build();
	}

	private OrderListResponseDto createOrderListResponseDto(List<Order> orders) {
		return OrderListResponseDto.builder()
			.count(orders.size())
			.orders(orders)
			.build();
	}
}
