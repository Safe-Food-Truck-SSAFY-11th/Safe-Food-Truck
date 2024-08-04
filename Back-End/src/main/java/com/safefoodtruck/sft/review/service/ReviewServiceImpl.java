package com.safefoodtruck.sft.review.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.safefoodtruck.sft.common.util.MemberInfo;
import com.safefoodtruck.sft.member.domain.Member;
import com.safefoodtruck.sft.member.repository.MemberRepository;
import com.safefoodtruck.sft.order.domain.Order;
import com.safefoodtruck.sft.order.exception.OrderNotFoundException;
import com.safefoodtruck.sft.order.repository.OrderRepository;
import com.safefoodtruck.sft.review.domain.Review;
import com.safefoodtruck.sft.review.domain.ReviewImage;
import com.safefoodtruck.sft.review.dto.request.ReviewRegistRequestDto;
import com.safefoodtruck.sft.review.dto.response.ReviewListResponseDto;
import com.safefoodtruck.sft.review.dto.response.ReviewResponseDto;
import com.safefoodtruck.sft.review.repository.ReviewImageRepository;
import com.safefoodtruck.sft.review.repository.ReviewRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

	private final ReviewRepository reviewRepository;
	private final MemberRepository memberRepository;
	private final OrderRepository orderRepository;
	private final ReviewImageRepository reviewImageRepository;

	@Override
	public ReviewResponseDto registReview(final ReviewRegistRequestDto reviewRegistRequestDto) {
		String email = MemberInfo.getEmail();
		Member customer = memberRepository.findByEmail(email);
		Order order = orderRepository.findById(reviewRegistRequestDto.orderId()).orElseThrow(OrderNotFoundException::new);

		Review review = Review.of(customer, order, reviewRegistRequestDto);
		Review savedReview = reviewRepository.save(review);

		saveReviewImages(reviewRegistRequestDto, savedReview);

		return ReviewResponseDto.fromEntity(savedReview);
	}

	private void saveReviewImages(ReviewRegistRequestDto reviewRegistRequestDto, Review review) {
		reviewRegistRequestDto.reviewImageDtos().forEach(dto -> {
			ReviewImage reviewImage = ReviewImage.of(dto);
			reviewImage.setReview(review);
			reviewImageRepository.save(reviewImage);
		});
	}

	@Override
	public ReviewListResponseDto findCustomerReviews() {
		String email = MemberInfo.getEmail();
		List<Review> customerReviews = reviewRepository.findByCustomerEmail(email);
		return createReviewListResponseDto(customerReviews);
	}

	@Override
	public ReviewListResponseDto findStoreReviews(final Integer storeId) {
		List<Review> storeReviews = reviewRepository.findByStoreId(storeId);
		return createReviewListResponseDto(storeReviews);
	}

	@Override
	public Integer findStoreStars(final Integer storeId) {
		Double averageStar = reviewRepository.findAverageStarByStoreId(storeId);
		return averageStar != null ? averageStar.intValue() : 0;
	}

	@Override
	public void deleteReview(final Integer reviewId) {
		reviewRepository.deleteById(reviewId);
	}

	private ReviewListResponseDto createReviewListResponseDto(List<Review> reviews) {
		List<ReviewResponseDto> reviewList = reviews.stream()
			.map(ReviewResponseDto::fromEntity)
			.collect(Collectors.toList());

		return ReviewListResponseDto.builder()
			.count(reviews.size())
			.reviewList(reviewList)
			.build();
	}
}
