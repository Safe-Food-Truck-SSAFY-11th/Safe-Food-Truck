package com.safefoodtruck.sft.review.repository;

import static com.safefoodtruck.sft.reply.domain.QReply.reply;
import static com.safefoodtruck.sft.review.domain.QReview.review;
import static com.safefoodtruck.sft.review.domain.QReviewImage.reviewImage;

import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.safefoodtruck.sft.review.domain.Review;
import com.safefoodtruck.sft.review.dto.response.ReviewListResponseDto;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
@Repository
@RequiredArgsConstructor
public class ReviewRepositoryCustomImpl implements ReviewRepositoryCustom {

	private final JPAQueryFactory queryFactory;

	@Override
	public ReviewListResponseDto findCustomerReviewsByEmail(String email) {
		List<Review> reviews = queryFactory
			.select(review)
			.from(review)
			.leftJoin(review.reviewImages, reviewImage)
			.leftJoin(review.reply, reply)
			.where(review.customer.email.eq(email))
			.distinct()
			.fetch();

		return ReviewListResponseDto.fromEntities(reviews);
	}

	@Override
	public ReviewListResponseDto findStoreReviewsByStoreId(Integer storeId) {
		List<Review> reviews = queryFactory
			.select(review)
			.from(review)
			.leftJoin(review.reviewImages, reviewImage)
			.leftJoin(review.reply, reply)
			.where(review.order.store.id.eq(storeId))
			.distinct()
			.fetch();

		return ReviewListResponseDto.fromEntities(reviews);
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
