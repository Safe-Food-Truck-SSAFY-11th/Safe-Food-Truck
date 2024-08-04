package com.safefoodtruck.sft.review.dto.response;

import com.safefoodtruck.sft.review.domain.Review;

import lombok.Builder;

@Builder
public record ReviewResponseDto(Integer id, String email, Integer storeId, Boolean isVisible, Integer star, String content) {

	public static ReviewResponseDto fromEntity(Review review) {
		return ReviewResponseDto.builder()
			.id(review.getId())
			.email(review.getCustomer().getEmail())
			.storeId(review.getOrder().getStoreId())
			.isVisible(review.getIsVisible())
			.star(review.getStar())
			.content(review.getContent())
			.build();
	}
}
