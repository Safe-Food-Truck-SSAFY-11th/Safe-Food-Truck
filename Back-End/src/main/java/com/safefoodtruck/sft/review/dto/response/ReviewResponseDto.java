package com.safefoodtruck.sft.review.dto.response;

import java.util.List;

import com.safefoodtruck.sft.reply.dto.response.ReplyResponseDto;
import com.safefoodtruck.sft.review.domain.Review;
import com.safefoodtruck.sft.review.dto.ReviewImageDto;

import lombok.Builder;

@Builder
public record ReviewResponseDto(Integer id, String email, String nickname, Integer orderId, Integer storeId, Boolean isVisible, Integer star, String content, List<ReviewImageDto> reviewImageDtos, ReplyResponseDto replyResponseDto) {

	public static ReviewResponseDto fromEntity(Review review) {
		List<ReviewImageDto> reviewImageDtos = review.getReviewImages().stream()
			.map(ReviewImageDto::fromEntity)
			.toList();

		ReplyResponseDto replyResponseDto = review.getReply() != null
			? ReplyResponseDto.fromEntity(review.getReply())
			: null;

		return ReviewResponseDto.builder()
			.id(review.getId())
			.email(review.getCustomer().getEmail())
			.nickname(review.getCustomer().getNickname())
			.orderId(review.getOrder().getId())
			.storeId(review.getOrder().getStore().getId())
			.isVisible(review.getIsVisible())
			.star(review.getStar())
			.content(review.getContent())
			.reviewImageDtos(reviewImageDtos)
			.replyResponseDto(replyResponseDto)
			.build();
	}
}
