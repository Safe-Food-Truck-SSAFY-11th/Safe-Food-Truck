package com.safefoodtruck.sft.order.dto.response;

import java.util.List;

import com.safefoodtruck.sft.order.domain.Order;

import lombok.Builder;

@Builder
public record OwnerOrderListResponseDto(Integer count, List<OwnerOrderResponseDto> ownerOrderResponseDtos) {
	public static OwnerOrderListResponseDto fromEntity(List<Order> orders) {
		List<OwnerOrderResponseDto> ownerOrderResponseDtos = orders.stream()
			.map(OwnerOrderResponseDto::fromEntity)
			.toList();

		return OwnerOrderListResponseDto.builder()
			.count(ownerOrderResponseDtos.size())
			.ownerOrderResponseDtos(ownerOrderResponseDtos)
			.build();
	}
}
