package com.safefoodtruck.sft.review.service;

import com.safefoodtruck.sft.review.dto.request.ReviewRegistRequestDto;
import com.safefoodtruck.sft.review.dto.response.ReviewListResponseDto;
import com.safefoodtruck.sft.review.dto.response.ReviewResponseDto;

public interface ReviewService {
	ReviewListResponseDto findCustomerReviews();
	ReviewListResponseDto findStoreReviews(Integer orderId);
	ReviewResponseDto registReview(ReviewRegistRequestDto reviewRegistRequestDto);
	Integer findStoreStars(Integer storeId);
	void deleteReview(Integer reviewId);
}
