package com.safefoodtruck.sft.review.repository;

import static com.safefoodtruck.sft.review.domain.QReview.*;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.safefoodtruck.sft.review.domain.Review;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class ReviewRepositoryCustomImpl implements ReviewRepositoryCustom {

	private final JPAQueryFactory queryFactory;

	@Override
	public List<Review> findByCustomerEmail(String email) {
		return queryFactory
			.selectFrom(review)
			.join(review.customer).fetchJoin() // fetch join 사용
			.where(review.customer.email.eq(email))
			.fetch();
	}

	@Override
	public List<Review> findByStoreId(Integer storeId) {
		return queryFactory
			.selectFrom(review)
			.join(review.order).fetchJoin() // fetch join 사용
			.join(review.order.store).fetchJoin() // fetch join 사용
			.where(review.order.store.id.eq(storeId))
			.fetch();
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
