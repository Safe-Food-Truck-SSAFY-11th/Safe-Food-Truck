package com.safefoodtruck.sft.review.dto.request;

public record ReviewRegistRequestDto(Integer orderId, Boolean isVisible, Integer star, String content) {
}
