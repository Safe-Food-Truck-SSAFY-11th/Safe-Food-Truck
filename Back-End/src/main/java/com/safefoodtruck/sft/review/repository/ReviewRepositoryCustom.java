package com.safefoodtruck.sft.review.repository;

import java.util.List;

import com.querydsl.core.Tuple;
import com.safefoodtruck.sft.review.domain.Review;
import com.safefoodtruck.sft.review.dto.response.ReviewListResponseDto;

public interface ReviewRepositoryCustom {
	ReviewListResponseDto findCustomerReviewsByEmail(String email);
	ReviewListResponseDto findStoreReviewsByStoreId(Integer storeId);
	Review findByReviewId(Integer reviewId);
	Double findAverageStarByStoreId(Integer storeId);
	List<Tuple> findAverageStarsForAllStores();
}
