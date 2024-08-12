package com.safefoodtruck.sft.review.repository;

import static com.safefoodtruck.sft.reply.domain.QReply.reply;
import static com.safefoodtruck.sft.review.domain.QReview.review;
import static com.safefoodtruck.sft.review.domain.QReviewImage.reviewImage;

import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.safefoodtruck.sft.reply.dto.response.ReplyResponseDto;
import com.safefoodtruck.sft.review.domain.Review;
import com.safefoodtruck.sft.review.dto.ReviewImageDto;
import com.safefoodtruck.sft.review.dto.response.ReviewListResponseDto;
import com.safefoodtruck.sft.review.dto.response.ReviewResponseDto;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class ReviewRepositoryCustomImpl implements ReviewRepositoryCustom {

	private final JPAQueryFactory queryFactory;

	@Override
	public ReviewListResponseDto findCustomerReviewsByEmail(String email) {
		return buildReviewListResponse(
			queryFactory
				.select(review)
				.from(review)
				.leftJoin(review.reviewImages, reviewImage)
				.leftJoin(review.reply, reply)
				.where(review.customer.email.eq(email))
				.distinct()
				.fetch()
		);
	}

	@Override
	public ReviewListResponseDto findStoreReviewsByStoreId(Integer storeId) {
		return buildReviewListResponse(
			queryFactory
				.select(review)
				.from(review)
				.leftJoin(review.reviewImages, reviewImage)
				.leftJoin(review.reply, reply)
				.where(review.order.store.id.eq(storeId))
				.distinct()
				.fetch()
		);
	}

	private ReviewListResponseDto buildReviewListResponse(List<Review> reviews) {
		List<ReviewResponseDto> reviewResponses = reviews.stream()
			.map(this::mapToReviewResponseDto)
			.toList();

		return ReviewListResponseDto.builder()
			.count(reviewResponses.size())
			.reviewList(reviewResponses)
			.build();
	}

	private ReviewResponseDto mapToReviewResponseDto(Review review) {
		return ReviewResponseDto.builder()
			.id(review.getId())
			.email(review.getCustomer().getEmail())
			.nickname(review.getCustomer().getNickname())
			.orderId(review.getOrder().getId())
			.storeId(review.getOrder().getStore().getId())
			.isVisible(review.getIsVisible())
			.star(review.getStar())
			.content(review.getContent())
			.reviewImageDtos(mapToReviewImageDtos(review))
			.replyResponseDto(mapToReplyResponseDto(review))
			.build();
	}

	private List<ReviewImageDto> mapToReviewImageDtos(Review review) {
		return review.getReviewImages().stream()
			.map(img -> ReviewImageDto.builder()
				.savedUrl(img.getSavedUrl())
				.savedPath(img.getSavedPath())
				.build())
			.toList();
	}

	private ReplyResponseDto mapToReplyResponseDto(Review review) {
		return review.getReply() != null ?
			ReplyResponseDto.builder()
				.id(review.getReply().getId())
				.reviewId(review.getId())
				.content(review.getReply().getContent())
				.build() : null;
	}

	@Override
	public Review findByReviewId(final Integer reviewId) {
		return queryFactory.selectFrom(review)
			.leftJoin(review.reply, reply)
			.fetchJoin()
			.where(review.id.eq(reviewId))
			.distinct()
			.fetchOne();
	}

	@Override
	public Double findAverageStarByStoreId(Integer storeId) {
		return queryFactory
			.select(review.star.avg())
			.from(review)
			.where(review.order.store.id.eq(storeId))
			.fetchOne();
	}

	@Override
	public List<Tuple> findAverageStarsForAllStores() {
		return queryFactory
			.select(review.order.store.id, review.star.avg())
			.from(review)
			.groupBy(review.order.store.id)
			.fetch();
	}
}
