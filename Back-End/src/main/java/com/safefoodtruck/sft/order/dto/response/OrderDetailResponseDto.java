package com.safefoodtruck.sft.order.dto.response;

import com.safefoodtruck.sft.order.domain.Order;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Builder;

@Builder
public record OrderDetailResponseDto(Integer orderId, String customerEmail, Integer storeId,
                                     OrderMenuListResponseDto orderMenuListResponseDto,
                                     LocalDateTime orderTime, String status, String cookingStatus,
                                     String request) {

    public static OrderDetailResponseDto fromEntity(Order order) {

        List<OrderMenuResponseDto> orderMenuResponseDtos = order.getOrderMenuList().stream()
            .map(OrderMenuResponseDto::fromEntity).toList();

        OrderMenuListResponseDto orderMenuListResponseDto = OrderMenuListResponseDto.builder()
            .count(orderMenuResponseDtos.size())
            .orderMenuResponseDtos(orderMenuResponseDtos).build();

        return OrderDetailResponseDto.builder()
            .orderId(order.getId())
            .customerEmail(order.getCustomer().getEmail())
            .storeId(order.getStore().getId())
            .orderMenuListResponseDto(orderMenuListResponseDto)
            .request(order.getRequest())
            .status(order.getStatus())
            .cookingStatus(order.getCookingStatus())
            .orderTime(order.getOrderTime())
            .build();
    }
}
