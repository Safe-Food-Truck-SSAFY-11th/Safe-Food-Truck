package com.safefoodtruck.sft.order.dto.request;

import java.util.List;

public record OrderRegistRequestDto(Integer storeId, String request, List<OrderMenuRequestDto> menuList) {

}
