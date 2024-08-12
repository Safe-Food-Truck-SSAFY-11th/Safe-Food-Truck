package com.safefoodtruck.sft.review.service;

import com.safefoodtruck.sft.common.util.MemberInfo;
import com.safefoodtruck.sft.member.domain.Member;
import com.safefoodtruck.sft.member.exception.NotFoundMemberException;
import com.safefoodtruck.sft.member.repository.MemberRepository;
import com.safefoodtruck.sft.notification.service.NotificationService;
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
import com.safefoodtruck.sft.store.domain.Store;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

	private final ReviewRepository reviewRepository;
	private final MemberRepository memberRepository;
	private final OrderRepository orderRepository;
	private final ReviewImageRepository reviewImageRepository;
	private final NotificationService notificationService;

	@Override
	public ReviewResponseDto registReview(final ReviewRegistRequestDto reviewRegistRequestDto) {
		String email = MemberInfo.getEmail();
		Member customer = memberRepository.findByEmail(email).orElseThrow(NotFoundMemberException::new);
		Order order = orderRepository.findById(reviewRegistRequestDto.orderId()).orElseThrow(
			OrderNotFoundException::new);

		Review review = Review.of(customer, order, reviewRegistRequestDto);
		Review savedReview = reviewRepository.save(review);

		reviewRegistRequestDto.reviewImageDtos().forEach(dto -> {
			ReviewImage reviewImage = ReviewImage.of(dto);
			savedReview.addReviewImage(reviewImage);
			reviewImageRepository.save(reviewImage);
		});
		Store store = order.getStore();
		String ownerEmail = store.getOwner().getEmail();
		Integer storeId = store.getId();
		notificationService.registReviewNotify(ownerEmail, storeId);
		return ReviewResponseDto.fromEntity(savedReview);
	}

	@Override
	public ReviewListResponseDto findCustomerReviews() {
		String email = MemberInfo.getEmail();
		return reviewRepository.findCustomerReviewsByEmail(email);
	}

	@Override
	public ReviewListResponseDto findStoreReviews(final Integer storeId) {
		return reviewRepository.findStoreReviewsByStoreId(storeId);
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
}
