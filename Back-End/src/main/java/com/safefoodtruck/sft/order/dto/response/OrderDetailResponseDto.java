package com.safefoodtruck.sft.order.dto.response;

import java.time.LocalDateTime;
import java.util.List;

import com.safefoodtruck.sft.order.domain.OrderMenu;

import lombok.Builder;

@Builder
public record OrderDetailResponseDto(Integer orderId, String customerEmail, Integer storeId, List<OrderMenu> orderMenuList, LocalDateTime orderTime, String status, String cookingStatus, String request) {
}
