package com.safefoodtruck.sft.order.dto.response;

import java.util.List;

import com.safefoodtruck.sft.order.domain.Order;

import lombok.Builder;

@Builder
public record OrderListResponseDto(Integer count, List<Order> orders) {
	public static OrderListResponseDto fromEntity(List<Order> orders) {
		return OrderListResponseDto.builder()
			.count(orders.size())
			.orders(orders)
			.build();
	}
}
