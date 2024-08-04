package com.safefoodtruck.sft.reply.service;

import org.springframework.stereotype.Service;

import com.safefoodtruck.sft.reply.domain.Reply;
import com.safefoodtruck.sft.reply.dto.request.ReplyRegistRequestDto;
import com.safefoodtruck.sft.reply.dto.response.ReplyResponseDto;
import com.safefoodtruck.sft.reply.repository.ReplyRepository;
import com.safefoodtruck.sft.review.domain.Review;
import com.safefoodtruck.sft.review.exception.ReviewNotFoundException;
import com.safefoodtruck.sft.review.repository.ReviewRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class ReplyServiceImpl implements ReplyService {

	private final ReplyRepository replyRepository;
	private final ReviewRepository reviewRepository;

	@Override
	public ReplyResponseDto registReply(final ReplyRegistRequestDto replyRegistRequestDto) {
		Review review = reviewRepository.findById(replyRegistRequestDto.reviewId()).orElseThrow(
			ReviewNotFoundException::new);
		Reply reply = Reply.of(review, replyRegistRequestDto);
		replyRepository.save(reply);

		return ReplyResponseDto.fromEntity(reply);
	}

	@Override
	public ReplyResponseDto findReply(final Integer reviewId) {
		Reply reply = replyRepository.findByReviewId(reviewId);

		return ReplyResponseDto.fromEntity(reply);
	}
}
