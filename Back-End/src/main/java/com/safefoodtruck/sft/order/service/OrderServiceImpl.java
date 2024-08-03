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

		Order order = Order.builder()
			.customer(customer)
			.store(store)
			.request(orderRegistRequestDto.request())
			.status(PENDING.get())
			.cookingStatus(PREPARING.get())
			.orderTime(LocalDateTime.now())
			.build();

		Order savedOrder = orderRepository.save(order);

		List<OrderMenuRequestDto> menuList = orderRegistRequestDto.menuList();

		String orderTitle = menuList.stream()
			.map(menuRequestDto -> menuRepository.findById(menuRequestDto.menuId())
				.orElseThrow(MenuNotFoundException::new).getName())
			.collect(Collectors.joining(", "));

		if (menuList.size() > 1) {
			orderTitle = orderTitle.split(", ")[0] + " 외 " + (menuList.size() - 1) + "개";
		}

		Integer totalQuantity = menuList.stream()
			.mapToInt(OrderMenuRequestDto::count)
			.sum();

		int totalAmount = menuList.stream()
			.mapToInt(menuRequestDto -> menuRepository.findById(menuRequestDto.menuId())
				.orElseThrow(MenuNotFoundException::new).getPrice() * menuRequestDto.count())
			.sum();

		List<OrderMenu> orderMenuList = menuList.stream()
			.map(menuRequestDto -> {
					Menu menu = menuRepository.findById(menuRequestDto.menuId())
						.orElseThrow(MenuNotFoundException::new);

					OrderMenu orderMenu = OrderMenu.builder()
						.menu(menu)
						.count(menuRequestDto.count())
						.build();

					savedOrder.addOrderMenu(orderMenu);
					return orderMenu;
				}
			).toList();

		log.info("savedOrder {} ", savedOrder);

		orderMenuRepository.saveAll(orderMenuList);

		return OrderRegistResponseDto.builder()
			.order(savedOrder)
			.menuName(orderTitle)
			.totalQuantity(totalQuantity)
			.totalAmount(totalAmount)
			.build();
	}

	@Override
	public String acceptOrder(Integer orderId) {
		log.info("before repository orderId : {}", orderId);
		Order order = orderRepository.findById(orderId).orElseThrow(OrderNotFoundException::new);
		log.info("after repository orderId : {}", orderId);
		if(order.isInValidRequest()) {
			throw new AlreadyProcessedOrderException();
		}

		order.acceptOrder();

		return order.getStatus();
	}

	@Override
	public String rejectOrder(Integer orderId) {
		Order order = orderRepository.findById(orderId).orElseThrow(OrderNotFoundException::new);
		if (order.isInValidRequest()) {
			throw new AlreadyProcessedOrderException();
		}

		order.rejectOrder();

		return order.getStatus();
	}

	@Override
	public String completeOrder(final Integer orderId) {
		Order order = orderRepository.findById(orderId).orElseThrow(OrderNotFoundException::new);
		if (order.isAlreadyCompletedOrder()) {
			throw new AlreadyCompletedOrderException();
		}

		order.completeOrder();

		return order.getCookingStatus();
	}

	public OrderListResponseDto findCustomerOrderList() {
		String email = MemberInfo.getEmail();
		List<Order> orders = orderRepository.findByCustomerEmail(email);

		return OrderListResponseDto.builder()
			.count(orders.size())
			.orders(orders)
			.build();
	}

	@Override
	public OrderListResponseDto findStoreOrderList() {
		String email = MemberInfo.getEmail();
		List<Order> orders = orderRepository.findByStoreOwnerEmail(email);

		return OrderListResponseDto.builder()
			.count(orders.size())
			.orders(orders)
			.build();
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

}
