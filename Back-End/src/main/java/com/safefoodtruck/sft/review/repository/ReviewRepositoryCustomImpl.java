package com.safefoodtruck.sft.review.repository;

import static com.safefoodtruck.sft.reply.domain.QReply.*;
import static com.safefoodtruck.sft.review.domain.QReview.*;
import static com.safefoodtruck.sft.review.domain.QReviewImage.*;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.querydsl.core.Tuple;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.safefoodtruck.sft.reply.dto.response.ReplyResponseDto;
import com.safefoodtruck.sft.review.dto.ReviewImageDto;
import com.safefoodtruck.sft.review.dto.response.ReviewListResponseDto;
import com.safefoodtruck.sft.review.dto.response.ReviewResponseDto;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class ReviewRepositoryCustomImpl implements ReviewRepositoryCustom {

	private final JPAQueryFactory queryFactory;

	@Override
	public ReviewListResponseDto findCustomerReviewsByEmail(String email) {

		List<ReviewResponseDto> reviewResponses = queryFactory
			.select(Projections.constructor(ReviewResponseDto.class,
				review.id,
				review.customer.email,
				review.customer.nickname,
				review.order.id.as("orderId"),
				review.order.store.id.as("storeId"),
				review.isVisible,
				review.star,
				review.content,
				Projections.list(
					Projections.constructor(ReviewImageDto.class,
						reviewImage.savedUrl,
						reviewImage.savedPath
					)
				),
				Projections.constructor(ReplyResponseDto.class,
					reply.id,
					reply.review.id.as("reviewId"),
					reply.content
				)
			))
			.from(review)
			.leftJoin(review.reviewImages, reviewImage)
			.leftJoin(review.reply, reply)
			.where(review.customer.email.eq(email))
			.distinct()
			.fetch();

		return ReviewListResponseDto.builder()
			.count(reviewResponses.size())
			.reviewList(reviewResponses)
			.build();
	}

	@Override
	public ReviewListResponseDto findStoreReviewsByStoreId(Integer storeId) {

		List<ReviewResponseDto> reviewResponses = queryFactory
			.select(Projections.constructor(ReviewResponseDto.class,
				review.id,
				review.customer.email,
				review.customer.nickname,
				review.order.id.as("orderId"),
				review.order.store.id.as("storeId"),
				review.isVisible,
				review.star,
				review.content,
				Projections.list(
					Projections.constructor(ReviewImageDto.class,
						reviewImage.savedUrl,
						reviewImage.savedPath
					)
				),
				Projections.constructor(ReplyResponseDto.class,
					reply.id,
					reply.review.id.as("reviewId"),
					reply.content
				)
			))
			.from(review)
			.leftJoin(review.reviewImages, reviewImage)
			.leftJoin(review.reply, reply)
			.where(review.order.store.id.eq(storeId))
			.distinct()
			.fetch();

		return ReviewListResponseDto.builder()
			.count(reviewResponses.size())
			.reviewList(reviewResponses)
			.build();
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
