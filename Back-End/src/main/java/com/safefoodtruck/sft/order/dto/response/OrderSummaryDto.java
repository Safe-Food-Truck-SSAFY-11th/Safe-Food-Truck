package com.safefoodtruck.sft.order.dto.response;

import com.safefoodtruck.sft.order.domain.OrderMenu;

import lombok.Builder;

@Builder
public record OrderSummaryDto(String menuName, Integer count) {
	public static OrderSummaryDto fromEntity(OrderMenu orderMenu) {
		return OrderSummaryDto.builder()
			.menuName(orderMenu.getMenu().getName())
			.count(orderMenu.getCount())
			.build();
	}
}
