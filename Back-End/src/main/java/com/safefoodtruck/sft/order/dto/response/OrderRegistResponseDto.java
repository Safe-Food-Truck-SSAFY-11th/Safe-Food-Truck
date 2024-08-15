package com.safefoodtruck.sft.order.dto.response;

import com.safefoodtruck.sft.order.domain.Order;

import lombok.Builder;

@Builder
public record OrderRegistResponseDto(Integer orderId, String menuName, Integer totalQuantity, Integer totalAmount) {
	public static OrderRegistResponseDto fromEntity(Order order, String orderTitle, Integer totalQuantity, Integer totalAmount) {
		return OrderRegistResponseDto.builder()
			.orderId(order.getId())
			.menuName(orderTitle)
			.totalQuantity(totalQuantity)
			.totalAmount(totalAmount)
			.build();
	}
}
