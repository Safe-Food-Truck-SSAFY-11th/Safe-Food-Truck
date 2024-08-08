package com.safefoodtruck.sft.order.dto.response;

import java.time.LocalDateTime;
import java.util.Optional;

import com.safefoodtruck.sft.order.domain.Order;

import lombok.Builder;

@Builder
public record OwnerOrderResponseDto(Integer orderId,
									OrderMenuListResponseDto orderMenuListResponseDto,
									String request, String status, String cookingStatus,
									LocalDateTime orderTime, Optional<LocalDateTime> completeTime,
									Integer amount) {
	public static OwnerOrderResponseDto fromEntity(Order order) {
		return OwnerOrderResponseDto.builder()
			.orderId(order.getId())
			.orderMenuListResponseDto(OrderMenuListResponseDto.fromEntity(order.getOrderMenuList()))
			.request(order.getRequest())
			.status(order.getStatus())
			.cookingStatus(order.getCookingStatus())
			.orderTime(order.getOrderTime())
			.completeTime(Optional.ofNullable(order.getCompleteTime()))
			.amount(order.getAmount())
			.build();
	}
}
