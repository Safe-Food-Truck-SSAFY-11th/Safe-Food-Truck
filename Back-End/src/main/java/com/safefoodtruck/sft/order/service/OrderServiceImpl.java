package com.safefoodtruck.sft.order.service;

import static com.safefoodtruck.sft.order.domain.OrderStatus.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.safefoodtruck.sft.common.util.MemberInfo;
import com.safefoodtruck.sft.member.domain.Member;
import com.safefoodtruck.sft.member.repository.MemberRepository;
import com.safefoodtruck.sft.menu.domain.Menu;
import com.safefoodtruck.sft.menu.exception.MenuNotFoundException;
import com.safefoodtruck.sft.menu.repository.MenuRepository;
import com.safefoodtruck.sft.notification.service.NotificationService;
import com.safefoodtruck.sft.order.domain.Order;
import com.safefoodtruck.sft.order.domain.OrderMenu;
import com.safefoodtruck.sft.order.dto.request.OrderMenuRequestDto;
import com.safefoodtruck.sft.order.dto.request.OrderRegistRequestDto;
import com.safefoodtruck.sft.order.dto.response.CustomerOrderListResponseDto;
import com.safefoodtruck.sft.order.dto.response.CustomerOrderResponseDto;
import com.safefoodtruck.sft.order.dto.response.OrderDetailResponseDto;
import com.safefoodtruck.sft.order.dto.response.OrderListResponseDto;
import com.safefoodtruck.sft.order.dto.response.OrderRegistResponseDto;
import com.safefoodtruck.sft.order.dto.response.OrderSummaryDto;
import com.safefoodtruck.sft.order.dto.response.OrderSummaryResponseDto;
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
	private final NotificationService notificationService;

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
		savedOrder.calculateAmount();
		store.addOrderList(savedOrder);

		notificationService.orderedSendNotify(store.getOwner().getEmail());
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
		Order savedOrder = orderRepository.save(order);

		if (savedOrder.getStatus().equals(ACCEPTED.get())) {
			String orderEmail = savedOrder.getCustomer().getEmail();
			String storeName = savedOrder.getStore().getName();
			notificationService.acceptedSendNotify(orderEmail, storeName);
		}

		return savedOrder.getStatus();
	}

	@Override
	public String rejectOrder(Integer orderId) {
		Order order = getOrder(orderId);

		if (order.isInValidRequest()) {
			throw new AlreadyProcessedOrderException();
		}

		order.rejectOrder();
		Order savedOrder = orderRepository.save(order);

		if (savedOrder.getStatus().equals(REJECTED.get())) {
			String orderCustomerEmail = savedOrder.getCustomer().getEmail();
			String orderStoreName = savedOrder.getStore().getName();
			notificationService.rejectedSendNotify(orderCustomerEmail, orderStoreName);
		}
		return savedOrder.getStatus();
	}

	@Override
	public String completeOrder(final Integer orderId) {
		Order order = getOrder(orderId);
		if (order.isAlreadyCompletedOrder()) {
			throw new AlreadyCompletedOrderException();
		}

		order.complete();
		Order savedOrder = orderRepository.save(order);

		if (savedOrder.getCookingStatus().equals(COMPLETED.get())) {
			String orderCustomerEmail = savedOrder.getCustomer().getEmail();
			String orderStoreName = savedOrder.getStore().getName();
			notificationService.completedSendNotify(orderCustomerEmail, orderStoreName);
		}
		return savedOrder.getCookingStatus();
	}

	private Order getOrder(Integer orderId) {
		return orderRepository.findById(orderId).orElseThrow(OrderNotFoundException::new);
	}

	@Override
	public CustomerOrderListResponseDto findCustomerOrderList() {
		String email = MemberInfo.getEmail();
		List<Order> orders = orderRepository.findByCustomerEmail(email);

		List<CustomerOrderResponseDto> customerOrderResponseDtos = orders.stream()
			.map(order -> {
				List<Menu> menus = order.getOrderMenuList().stream()
					.map(OrderMenu::getMenu)
					.toList();
				return CustomerOrderResponseDto.fromEntity(order, menus);
			})
			.toList();

		return CustomerOrderListResponseDto.fromEntity(customerOrderResponseDtos);
	}

	@Override
	public OrderListResponseDto findStoreOrderList() {
		String email = MemberInfo.getEmail();
		List<Order> orders = orderRepository.findByStoreOwnerEmail(email);

		return OrderListResponseDto.fromEntity(orders);
	}

	@Override
	public OrderDetailResponseDto findOrderDetail(Integer orderId) {
		Order order = orderRepository.findById(orderId).orElseThrow(OrderNotFoundException::new);

		return OrderDetailResponseDto.fromEntity(order);
	}

	@Override
	public List<OrderSummaryResponseDto> getWeeklyOrderSummary() {
		String email = MemberInfo.getEmail();
		LocalDate today = LocalDate.now();
		LocalDate weekAgo = today.minusDays(6);

		List<Order> orders = orderRepository.findByStoreOwnerEmailAndOrderTimeBetween(email, weekAgo.atStartOfDay(), today.atTime(23, 59, 59));

		// 날짜별로 주문을 그룹화
		Map<LocalDate, List<Order>> ordersGroupedByDate = orders.stream()
			.collect(Collectors.groupingBy(order -> order.getOrderTime().toLocalDate()));

		return ordersGroupedByDate.entrySet().stream()
			.map(entry -> {
				LocalDate date = entry.getKey();
				List<Order> dailyOrders = entry.getValue();

				// 해당 날짜의 총 매출 계산
				int totalAmount = dailyOrders.stream().mapToInt(Order::getAmount).sum();

				// 메뉴별로 주문 내역 정리
				Map<String, Integer> menuSalesMap = new HashMap<>();
				for (Order order : dailyOrders) {
					for (OrderMenu orderMenu : order.getOrderMenuList()) {
						String menuName = orderMenu.getMenu().getName();
						int menuCount = orderMenu.getCount();
						menuSalesMap.put(menuName, menuSalesMap.getOrDefault(menuName, 0) + menuCount);
					}
				}

				// 메뉴별 주문 내역 리스트 생성
				List<OrderSummaryDto> menuOrderSummaries = menuSalesMap.entrySet().stream()
					.map(e -> new OrderSummaryDto(e.getKey(), e.getValue()))
					.toList();

				return new OrderSummaryResponseDto(date, totalAmount, menuOrderSummaries);
			})
			.toList();
	}


}
