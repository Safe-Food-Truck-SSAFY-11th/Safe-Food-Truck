package com.safefoodtruck.sft.review.dto.response;

import com.safefoodtruck.sft.reply.dto.response.ReplyResponseDto;
import java.util.List;

import com.safefoodtruck.sft.review.domain.Review;
import com.safefoodtruck.sft.review.domain.ReviewImage;

import lombok.Builder;

@Builder
public record ReviewResponseDto(Integer id, String email, String nickname, Integer storeId, Boolean isVisible, Integer star, String content, List<ReviewImage> reviewImages, ReplyResponseDto replyResponseDto) {
	public static ReviewResponseDto fromEntity(Review review, ReplyResponseDto replyResponseDto) {
		return ReviewResponseDto.builder()
			.id(review.getId())
			.email(review.getCustomer().getEmail())
			.nickname(review.getCustomerNickname())
			.storeId(review.getOrder().getStoreId())
			.isVisible(review.getIsVisible())
			.star(review.getStar())
			.content(review.getContent())
			.reviewImages(review.getReviewImages())
			.replyResponseDto(replyResponseDto)
			.build();
	}
}
