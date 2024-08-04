package com.safefoodtruck.sft.reply.dto.response;

import com.safefoodtruck.sft.reply.domain.Reply;

import lombok.Builder;

@Builder
public record ReplyResponseDto(Integer id, Integer reviewId, String content) {

	public static ReplyResponseDto fromEntity(Reply reply) {
		return ReplyResponseDto.builder()
			.id(reply.getId())
			.reviewId(reply.getReviewId())
			.content(reply.getContent())
			.build();
	}
}
