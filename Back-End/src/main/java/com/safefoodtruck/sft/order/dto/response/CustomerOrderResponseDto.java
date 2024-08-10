package com.safefoodtruck.sft.order.dto.response;

import java.util.List;

import com.safefoodtruck.sft.menu.domain.Menu;
import com.safefoodtruck.sft.menu.dto.response.MenuResponseDto;
import com.safefoodtruck.sft.order.domain.Order;

import lombok.Builder;

@Builder
public record CustomerOrderResponseDto(Integer orderId, Integer storeId, String storeName, String status, Integer amount, List<MenuResponseDto> menuResponseDtos) {
	public static CustomerOrderResponseDto fromEntity(Order order, List<Menu> menus) {
		return CustomerOrderResponseDto.builder()
			.orderId(order.getId())
			.storeId(order.getStore().getId())
			.status(order.getStatus())
			.storeName(order.getStore().getName())
			.amount(order.getAmount())
			.menuResponseDtos(convertMenusToDto(menus))
			.build();
	}

	private static List<MenuResponseDto> convertMenusToDto(List<Menu> menus) {
		return menus.stream()
			.map(MenuResponseDto::fromEntity)
			.toList();
	}
}
