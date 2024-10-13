package com.safefoodtruck.sft.review.dto.request;

import java.util.List;

import com.safefoodtruck.sft.review.dto.ReviewImageDto;

public record ReviewRegistRequestDto(Integer orderId, Boolean isVisible, Integer star, String content, List<ReviewImageDto> reviewImageDtos) {
}
