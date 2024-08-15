package com.safefoodtruck.sft.review.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.safefoodtruck.sft.review.domain.Review;
import com.safefoodtruck.sft.review.domain.ReviewImage;
import lombok.Builder;

@Builder
public record ReviewImageDto(@JsonIgnore Review review, String savedUrl, String savedPath) {
	public static ReviewImageDto fromEntity(ReviewImage reviewImage) {
		return ReviewImageDto.builder()
			.review(reviewImage.getReview())
			.savedUrl(reviewImage.getSavedUrl())
			.savedPath(reviewImage.getSavedPath())
			.build();
	}
}
