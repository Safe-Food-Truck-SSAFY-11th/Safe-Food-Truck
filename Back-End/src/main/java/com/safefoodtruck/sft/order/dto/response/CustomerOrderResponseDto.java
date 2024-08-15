package com.safefoodtruck.sft.order.dto.response;

import com.safefoodtruck.sft.menu.dto.response.MenuResponseDto;
import com.safefoodtruck.sft.order.domain.Order;
import java.util.List;
import lombok.Builder;

@Builder
public record CustomerOrderResponseDto(Integer orderId, Integer storeId, String storeName, String status, Integer amount, List<MenuResponseDto> menuResponseDtos) {
	public static CustomerOrderResponseDto fromEntity(Order order) {
		List<MenuResponseDto> menuResponseDtos = order.getOrderMenuList().stream()
			.map(orderMenu -> MenuResponseDto.fromEntity(orderMenu.getMenu()))
			.toList();

		return CustomerOrderResponseDto.builder()
			.orderId(order.getId())
			.storeId(order.getStore().getId())
			.status(order.getStatus())
			.storeName(order.getStore().getName())
			.amount(order.getAmount())
			.menuResponseDtos(menuResponseDtos)
			.build();
	}
}
