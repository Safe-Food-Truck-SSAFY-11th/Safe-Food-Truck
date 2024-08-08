package com.safefoodtruck.sft.order.dto.response;

import java.util.List;

import lombok.Builder;

@Builder
public record WeeklyCustomerOrderSummaryResponseDto(Long weeklyOrderCount, Integer weeklyTotalAmount, List<CustomerOrderByStoreSummaryDto> customerOrderByStoreSummaryDtos) {
	public static WeeklyCustomerOrderSummaryResponseDto of(Long weeklyOrderCount, Integer weeklyTotalAmount, List<CustomerOrderByStoreSummaryDto> customerOrderByStoreSummaryDtos) {
		return WeeklyCustomerOrderSummaryResponseDto.builder()
			.weeklyOrderCount(weeklyOrderCount)
			.weeklyTotalAmount(weeklyTotalAmount)
			.customerOrderByStoreSummaryDtos(customerOrderByStoreSummaryDtos)
			.build();
	}
}
