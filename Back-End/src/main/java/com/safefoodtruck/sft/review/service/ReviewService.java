package com.safefoodtruck.sft.review.service;

import com.safefoodtruck.sft.review.dto.request.ReviewRegistRequestDto;
import com.safefoodtruck.sft.review.dto.response.ReviewListResponseDto;
import com.safefoodtruck.sft.review.dto.response.ReviewResponseDto;

public interface ReviewService {
	ReviewResponseDto registReview(ReviewRegistRequestDto reviewRegistRequestDto);
	ReviewListResponseDto findCustomerReviews();
	ReviewListResponseDto findStoreReviews(Integer orderId);
	Integer findStoreStars(Integer storeId);
	void deleteReview(Integer reviewId);
}
