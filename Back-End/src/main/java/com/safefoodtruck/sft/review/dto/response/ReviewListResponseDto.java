package com.safefoodtruck.sft.review.dto.response;

import java.util.List;

import lombok.Builder;

@Builder
public record ReviewListResponseDto(Integer count, List<ReviewResponseDto> reviewList) {
}
