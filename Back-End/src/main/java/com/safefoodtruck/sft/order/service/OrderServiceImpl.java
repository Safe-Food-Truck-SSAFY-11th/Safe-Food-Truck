package com.safefoodtruck.sft.order.service;

import java.time.LocalDateTime;
import java.util.List;

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
import com.safefoodtruck.sft.order.dto.response.OrderRegistResponseDto;
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

		Store store = storeRepository.findById(orderRegistRequestDto.storeId()).orElseThrow(
			StoreNotFoundException::new);

		Order order = Order.builder()
			.customer(customer)
			.store(store)
			.isAccepted(false)
			.orderTime(LocalDateTime.now())
			.request(orderRegistRequestDto.request())
			.isDone(false)
			.build();

		Order savedOrder = orderRepository.save(order);

		List<OrderMenuRequestDto> menuList = orderRegistRequestDto.menuList();

		String orderTitle = "";
		Integer totalQuantity = 0;
		Integer totalAmount = 0;

		for (OrderMenuRequestDto menuRequestDto : menuList) {
			Menu menu = menuRepository.findById(menuRequestDto.menuId())
				.orElseThrow(MenuNotFoundException::new);

			if(orderTitle.isEmpty()) {
				orderTitle = menu.getName() + " 외 " + (menuList.size() - 1) + "개";
			}
			totalQuantity += menuRequestDto.count();
			totalAmount += menu.getPrice() * menuRequestDto.count();

			OrderMenu orderMenu = OrderMenu.builder()
				.menu(menu)
				.order(savedOrder)
				.count(menuRequestDto.count())
				.build();

			orderMenuRepository.save(orderMenu);
		}

        return OrderRegistResponseDto.builder()
            .order(savedOrder)
            .menuName(orderTitle)
            .totalQuantity(totalQuantity)
            .totalAmount(totalAmount)
            .build();
	}
}
