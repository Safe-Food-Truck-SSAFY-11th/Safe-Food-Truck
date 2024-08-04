package com.safefoodtruck.sft.order.dto.response;

import com.safefoodtruck.sft.order.domain.Order;

import lombok.Builder;

@Builder
public record OrderRegistResponseDto(Order order, String menuName, Integer totalQuantity, Integer totalAmount) {
}
