package com.safefoodtruck.sft.order.dto.response;

import java.util.List;
import lombok.Builder;

@Builder
public record CustomerPreparingOrderListResponseDto(Integer count, List<CustomerPreparingOrderResponseDto> customerPreparingOrderResponseDtos) {
}
