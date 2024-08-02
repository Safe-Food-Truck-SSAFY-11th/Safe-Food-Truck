package com.safefoodtruck.sft.order.service;

import com.safefoodtruck.sft.common.util.MemberInfo;
import com.safefoodtruck.sft.member.domain.Member;
import com.safefoodtruck.sft.member.repository.MemberRepository;
import com.safefoodtruck.sft.order.domain.Order;
import com.safefoodtruck.sft.order.dto.request.OrderCreateRequestDto;
import com.safefoodtruck.sft.order.dto.response.OrderRequestDto;
import com.safefoodtruck.sft.order.repository.OrderRepository;
import com.safefoodtruck.sft.store.domain.Store;
import com.safefoodtruck.sft.store.exception.StoreNotFoundException;
import com.safefoodtruck.sft.store.repository.StoreRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService  {

    private final MemberRepository memberRepository;
    private final StoreRepository storeRepository;
    private final OrderRepository orderRepository;

    @Override
    public Integer order(OrderRequestDto orderRequestDto) {
        String email = MemberInfo.getEmail();
        Member customer = memberRepository.findByEmail(email);
        Store store = storeRepository.findById(orderRequestDto.storeId()).orElseThrow(StoreNotFoundException::new);
        OrderCreateRequestDto orderCreateRequestDto = OrderCreateRequestDto.create(customer, store,
            orderRequestDto.request(), orderRequestDto);

        Order order = Order.createOrder(orderCreateRequestDto);
        orderRepository.save(order);

        return order.getId();
    }
}
