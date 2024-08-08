package com.safefoodtruck.sft.order.dto.response;

import java.util.List;
import java.util.Objects;

import com.safefoodtruck.sft.order.domain.Order;
import com.safefoodtruck.sft.store.domain.Store;

import lombok.Builder;

@Builder
public record CustomerOrderByStoreSummaryDto(Integer storeId, String storeName, String storeType, Long orderCount, Integer totalAmount) {
	public static CustomerOrderByStoreSummaryDto fromEntity(Store store, List<Order> orders) {
		Integer sumOfAmount = orders.stream()
			.filter(Objects::nonNull)
			.mapToInt(Order::getAmount)
			.sum();

		return CustomerOrderByStoreSummaryDto.builder()
			.storeId(store.getId())
			.storeName(store.getName())
			.orderCount((long)orders.size())
			.totalAmount(sumOfAmount)
			.build();
	}
}
