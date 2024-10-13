package com.safefoodtruck.sft.order.dto.response;

import java.util.List;

import com.safefoodtruck.sft.order.domain.OrderMenu;

import lombok.Builder;

@Builder
public record OrderMenuListResponseDto(Integer count, List<OrderMenuResponseDto> orderMenuResponseDtos) {
	public static OrderMenuListResponseDto fromEntity(List<OrderMenu> orderMenuList) {
		List<OrderMenuResponseDto> orderMenuResponseDtos = orderMenuList.stream()
			.map(OrderMenuResponseDto::fromEntity).toList();

		return OrderMenuListResponseDto.builder()
			.count(orderMenuResponseDtos.size())
			.orderMenuResponseDtos(orderMenuResponseDtos)
			.build();
	}
}
