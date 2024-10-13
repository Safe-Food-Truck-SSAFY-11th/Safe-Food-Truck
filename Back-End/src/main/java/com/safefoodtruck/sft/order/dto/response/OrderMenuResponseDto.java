package com.safefoodtruck.sft.order.dto.response;

import com.safefoodtruck.sft.order.domain.OrderMenu;

import lombok.Builder;

@Builder
public record OrderMenuResponseDto(Integer orderId, Integer count, String menuName) {
	public static OrderMenuResponseDto fromEntity(OrderMenu orderMenu) {
		return OrderMenuResponseDto.builder()
			.orderId(orderMenu.getOrder().getId())
			.count(orderMenu.getCount())
			.menuName(orderMenu.getMenu().getName())
			.build();
	}
}
