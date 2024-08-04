package com.safefoodtruck.sft.review.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.safefoodtruck.sft.review.domain.Review;

public interface ReviewRepository extends JpaRepository<Review, Integer> {

	@Query("SELECT r FROM Review r WHERE r.customer.email = :email")
	List<Review> findByCustomerEmail(@Param("email") String email);

	@Query("SELECT r FROM Review r WHERE r.order.store.id = :storeId")
	List<Review> findByStoreId(Integer storeId);
}
