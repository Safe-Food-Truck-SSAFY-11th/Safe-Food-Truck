package com.safefoodtruck.sft.order.service;

import com.safefoodtruck.sft.order.dto.response.OrderRequestDto;

public interface OrderService {
    Integer order(OrderRequestDto orderRequestDto);
}
