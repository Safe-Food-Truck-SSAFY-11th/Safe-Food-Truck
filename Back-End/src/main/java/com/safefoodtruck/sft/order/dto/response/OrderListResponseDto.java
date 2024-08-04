package com.safefoodtruck.sft.order.dto.response;

import java.util.List;

import com.safefoodtruck.sft.order.domain.Order;

import lombok.Builder;

@Builder
public record OrderListResponseDto(Integer count, List<Order> orders) {
}
