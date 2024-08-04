package com.safefoodtruck.sft.report.repository;

import com.safefoodtruck.sft.member.domain.Member;
import com.safefoodtruck.sft.report.domain.Report;
import com.safefoodtruck.sft.report.dto.response.ReportInsertResponseDto;
import com.safefoodtruck.sft.review.domain.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ReportRepository extends JpaRepository<Report, Integer> {
    @Query(value = "SELECT new com.safefoodtruck.sft.report.dto.response.ReportInsertResponseDto(COUNT(r)) " +
        "FROM Report r " +
        "WHERE r.review.id = :reviewId")
    ReportInsertResponseDto findReportCountById(@Param("reviewId") Integer reviewId);
    Report findByReviewAndMember(Review review, Member member);
}
