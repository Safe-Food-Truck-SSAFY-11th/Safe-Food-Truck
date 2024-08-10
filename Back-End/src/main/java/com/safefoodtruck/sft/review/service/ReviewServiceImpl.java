package com.safefoodtruck.sft.review.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.safefoodtruck.sft.common.util.MemberInfo;
import com.safefoodtruck.sft.member.domain.Member;
import com.safefoodtruck.sft.member.exception.NotFoundMemberException;
import com.safefoodtruck.sft.member.repository.MemberRepository;
import com.safefoodtruck.sft.notification.service.NotificationService;
import com.safefoodtruck.sft.order.domain.Order;
import com.safefoodtruck.sft.order.exception.OrderNotFoundException;
import com.safefoodtruck.sft.order.repository.OrderRepository;
import com.safefoodtruck.sft.reply.domain.Reply;
import com.safefoodtruck.sft.reply.dto.response.ReplyResponseDto;
import com.safefoodtruck.sft.reply.repository.ReplyRepository;
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

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

	private final ReviewRepository reviewRepository;
	private final MemberRepository memberRepository;
	private final OrderRepository orderRepository;
	private final ReplyRepository replyRepository;
	private final ReviewImageRepository reviewImageRepository;
	private final NotificationService notificationService;

	@Override
	public ReviewResponseDto registReview(final ReviewRegistRequestDto reviewRegistRequestDto) {
		String email = MemberInfo.getEmail();
		Member customer = memberRepository.findByEmail(email).orElseThrow(NotFoundMemberException::new);;
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
		return ReviewResponseDto.fromEntity(savedReview, null);  // 등록 시점에는 reply가 없으므로 null을 전달
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
			.map(review -> {
				Reply reply = replyRepository.findByReviewId(review.getId());
				ReplyResponseDto replyDto = (reply != null) ? ReplyResponseDto.fromEntity(reply) : null;
				return ReviewResponseDto.fromEntity(review, replyDto);
			})
			.toList();

		return ReviewListResponseDto.builder()
			.count(reviews.size())
			.reviewList(reviewList)
			.build();
	}
}
