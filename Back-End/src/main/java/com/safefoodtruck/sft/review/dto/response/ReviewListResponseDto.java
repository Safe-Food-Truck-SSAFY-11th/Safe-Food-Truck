package com.safefoodtruck.sft.review.dto.response;

import com.safefoodtruck.sft.review.domain.Review;
import java.util.List;
import lombok.Builder;

@Builder
public record ReviewListResponseDto(Integer count, List<ReviewResponseDto> reviewResponseDtos) {

    public static ReviewListResponseDto fromEntities(List<Review> reviews) {
        List<ReviewResponseDto> reviewResponseDtos = reviews.stream()
            .map(ReviewResponseDto::fromEntity)
            .toList();

        return ReviewListResponseDto.builder()
            .count(reviewResponseDtos.size())
            .reviewResponseDtos(reviewResponseDtos)
            .build();
    }
}
