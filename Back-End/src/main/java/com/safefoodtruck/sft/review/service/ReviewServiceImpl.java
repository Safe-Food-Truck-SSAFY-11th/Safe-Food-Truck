package com.safefoodtruck.sft.review.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.safefoodtruck.sft.common.util.MemberInfo;
import com.safefoodtruck.sft.member.domain.Member;
import com.safefoodtruck.sft.member.repository.MemberRepository;
import com.safefoodtruck.sft.order.domain.Order;
import com.safefoodtruck.sft.order.exception.OrderNotFoundException;
import com.safefoodtruck.sft.order.repository.OrderRepository;
import com.safefoodtruck.sft.review.domain.Review;
import com.safefoodtruck.sft.review.dto.request.ReviewRegistRequestDto;
import com.safefoodtruck.sft.review.dto.response.ReviewListResponseDto;
import com.safefoodtruck.sft.review.dto.response.ReviewResponseDto;
import com.safefoodtruck.sft.review.repository.ReviewRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService  {

	private final ReviewRepository reviewRepository;
	private final MemberRepository memberRepository;
	private final OrderRepository orderRepository;

	@Override
	public ReviewListResponseDto findCustomerReviews() {
		String email = MemberInfo.getEmail();
		List<Review> customerReviews = reviewRepository.findByCustomerEmail(email);
		List<ReviewResponseDto> reviewList = customerReviews.stream()
			.map(ReviewResponseDto::fromEntity)
			.toList();

		return ReviewListResponseDto.builder()
			.count(customerReviews.size())
			.reviewList(reviewList)
			.build();
	}


	@Override
	public ReviewListResponseDto findStoreReviews(final Integer storeId) {
		List<Review> storeReviews = reviewRepository.findByStoreId(storeId);
		List<ReviewResponseDto> reviewList = storeReviews.stream()
			.map(ReviewResponseDto::fromEntity)
			.toList();

		return ReviewListResponseDto.builder()
			.count(storeReviews.size())
			.reviewList(reviewList)
			.build();
	}

	@Override
	public ReviewResponseDto registReview(final ReviewRegistRequestDto reviewRegistRequestDto) {
		String email = MemberInfo.getEmail();
		Member customer = memberRepository.findByEmail(email);
		Order order = orderRepository.findById(reviewRegistRequestDto.orderId()).orElseThrow(
			OrderNotFoundException::new);
		Review review = Review.of(customer, order, reviewRegistRequestDto);

		reviewRepository.save(review);

		return ReviewResponseDto.fromEntity(review);
	}

	@Override
	public Integer findStoreStars(final Integer storeId) {
		return 0;
	}

	@Override
	public void deleteReview(final Integer reviewId) {

	}
}
