package com.safefoodtruck.sft.order.dto.response;

import java.time.LocalDate;
import java.util.List;

import com.safefoodtruck.sft.order.domain.Order;
import com.safefoodtruck.sft.order.domain.OrderMenu;

import lombok.Builder;

@Builder
public record OrderSummaryResponseDto(LocalDate date, Integer totalAmount, List<OrderSummaryDto> menuDetails) {
	public static OrderSummaryResponseDto fromEntity(Order order, List<OrderMenu> orderMenuList) {
		List<OrderSummaryDto> menuDetails = orderMenuList.stream()
			.map(OrderSummaryDto::fromEntity)
			.toList();

		return OrderSummaryResponseDto.builder()
			.date(order.getOrderTime().toLocalDate())
			.totalAmount(order.getAmount())
			.menuDetails(menuDetails)
			.build();
	}
}
