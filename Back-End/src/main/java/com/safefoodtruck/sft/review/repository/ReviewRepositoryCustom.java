package com.safefoodtruck.sft.review.repository;

import java.util.List;

import com.querydsl.core.Tuple;
import com.safefoodtruck.sft.review.domain.Review;

public interface ReviewRepositoryCustom {
	List<Review> findByCustomerEmail(String email);
	List<Review> findByStoreId(Integer storeId);
	Double findAverageStarByStoreId(Integer storeId);
	List<Tuple> findAverageStarsForAllStores();
}
