package com.safefoodtruck.sft.order.service;

import com.safefoodtruck.sft.order.dto.request.OrderListRequestDto;

public interface OrderService {
    Integer order(OrderListRequestDto orderListRequestDto);
}
