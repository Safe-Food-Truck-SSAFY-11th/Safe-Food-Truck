package com.safefoodtruck.sft.reply.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.safefoodtruck.sft.reply.domain.Reply;

public interface ReplyRepository extends JpaRepository<Reply, Integer> {

	@Query("SELECT r FROM Reply r WHERE r.review.id = :reviewId")
	Reply findByReviewId(@Param("reviewId") Integer reviewId);
}
