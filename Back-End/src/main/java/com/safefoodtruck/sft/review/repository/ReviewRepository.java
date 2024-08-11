package com.safefoodtruck.sft.review.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.safefoodtruck.sft.review.domain.Review;

public interface ReviewRepository extends JpaRepository<Review, Integer>, ReviewRepositoryCustom {
}
