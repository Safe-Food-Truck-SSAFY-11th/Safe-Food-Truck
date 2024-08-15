package com.safefoodtruck.sft.order.dto.response;

import java.util.List;

import lombok.Builder;

@Builder
public record CustomerOrderListResponseDto(Integer count, List<CustomerOrderResponseDto> customerOrderResponseDtos) {
	public static CustomerOrderListResponseDto fromEntity(List<CustomerOrderResponseDto> customerOrderResponseDtos) {
		return CustomerOrderListResponseDto.builder()
			.count(customerOrderResponseDtos.size())
			.customerOrderResponseDtos(customerOrderResponseDtos)
			.build();
	}
}
