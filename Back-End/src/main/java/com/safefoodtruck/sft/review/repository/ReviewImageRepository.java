package com.safefoodtruck.sft.review.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.safefoodtruck.sft.review.domain.ReviewImage;

public interface ReviewImageRepository extends JpaRepository<ReviewImage, Integer> {
}
