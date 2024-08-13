package com.safefoodtruck.sft.order.dto.response;

import java.time.LocalDateTime;
import lombok.Builder;

@Builder
public record CustomerPreparingOrderResponseDto(Integer orderId, Integer storeId, String status,
                                                String cookingStatus, LocalDateTime orderTime,
                                                String orderTitle) {
}
