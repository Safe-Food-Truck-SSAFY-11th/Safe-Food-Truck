package com.safefoodtruck.sft.order.service;

import com.safefoodtruck.sft.order.dto.request.OrderRegistRequestDto;
import com.safefoodtruck.sft.order.dto.response.OrderRegistResponseDto;

public interface OrderService {
    OrderRegistResponseDto order(OrderRegistRequestDto orderRegistRequestDto);
}
