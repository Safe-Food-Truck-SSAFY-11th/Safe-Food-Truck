package com.safefoodtruck.sft.order.dto.request;

import com.safefoodtruck.sft.member.domain.Member;
import com.safefoodtruck.sft.order.dto.response.OrderRequestDto;
import com.safefoodtruck.sft.store.domain.Store;
import lombok.Builder;

@Builder
public record OrderCreateRequestDto(Member customer, Store store, String request, OrderRequestDto orderRequestDto) {
    public static OrderCreateRequestDto create(Member customer, Store store, String request, OrderRequestDto orderRequestDto) {
        return OrderCreateRequestDto.builder()
            .customer(customer)
            .store(store)
            .request(request)
            .orderRequestDto(orderRequestDto)
            .build();
    }
}
