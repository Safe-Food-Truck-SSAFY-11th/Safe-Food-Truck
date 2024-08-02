package com.safefoodtruck.sft.order.dto.request;

import java.util.List;

public record OrderListRequestDto(Integer storeId, String request, List<OrderRequestDto> orderRequestDtos) {

}
