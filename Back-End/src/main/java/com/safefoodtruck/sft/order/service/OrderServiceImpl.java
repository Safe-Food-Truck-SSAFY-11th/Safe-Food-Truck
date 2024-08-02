package com.safefoodtruck.sft.order.service;

import com.safefoodtruck.sft.common.util.MemberInfo;
import com.safefoodtruck.sft.member.domain.Member;
import com.safefoodtruck.sft.member.repository.MemberRepository;
import com.safefoodtruck.sft.menu.domain.Menu;
import com.safefoodtruck.sft.menu.exception.MenuNotFoundException;
import com.safefoodtruck.sft.menu.repository.MenuRepository;
import com.safefoodtruck.sft.order.domain.Order;
import com.safefoodtruck.sft.order.domain.OrderMenu;
import com.safefoodtruck.sft.order.dto.request.OrderListRequestDto;
import com.safefoodtruck.sft.order.dto.request.OrderRequestDto;
import com.safefoodtruck.sft.order.repository.OrderRepository;
import com.safefoodtruck.sft.store.domain.Store;
import com.safefoodtruck.sft.store.exception.StoreNotFoundException;
import com.safefoodtruck.sft.store.repository.StoreRepository;
import jakarta.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final MemberRepository memberRepository;
    private final StoreRepository storeRepository;
    private final OrderRepository orderRepository;
    private final MenuRepository menuRepository;

    @Override
    public Integer order(OrderListRequestDto orderListRequestDto) {
        String email = MemberInfo.getEmail();
        Member customer = memberRepository.findByEmail(email);
        Store store = storeRepository.findById(orderListRequestDto.storeId())
            .orElseThrow(StoreNotFoundException::new);
        List<OrderMenu> orderMenuList = new ArrayList<>();

        for (OrderRequestDto orderRequestDto : orderListRequestDto.orderRequestDtos()) {
            Menu menu = menuRepository.findById(orderRequestDto.menuId()).orElseThrow(
                MenuNotFoundException::new);

            OrderMenu orderMenu = OrderMenu.createOrderMenu(menu, orderRequestDto.count());
            orderMenuList.add(orderMenu);
        }

        Order order = Order.createOrder(customer, store, orderListRequestDto.request(), orderMenuList);
        orderRepository.save(order);

        return order.getId();
    }
}
