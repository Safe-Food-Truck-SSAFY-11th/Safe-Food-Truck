package com.safefoodtruck.sft.report.service;

import com.safefoodtruck.sft.member.domain.Member;
import com.safefoodtruck.sft.member.repository.MemberRepository;
import com.safefoodtruck.sft.report.domain.Report;
import com.safefoodtruck.sft.report.dto.request.ReportInsertRequestDto;
import com.safefoodtruck.sft.report.dto.response.ReportInsertResponseDto;
import com.safefoodtruck.sft.report.exception.NotFoundReviewException;
import com.safefoodtruck.sft.report.repository.ReportRepository;
import com.safefoodtruck.sft.review.domain.Review;
import com.safefoodtruck.sft.review.repository.ReviewRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class ReportServiceImpl implements ReportService {

    private final ReportRepository reportRepository;
    private final MemberRepository memberRepository;
    private final ReviewRepository reviewRepository;

    @Override
    public ReportInsertResponseDto insertReport(String userEmail,
        ReportInsertRequestDto reportInsertRequestDto) {
        Member member = memberRepository.findByEmail(userEmail);
        Review review = reviewRepository.findById(reportInsertRequestDto.getReviewId())
            .orElseThrow(NotFoundReviewException::new);

        reportRepository.save(Report.builder()
            .member(member)
            .review(review)
            .description(reportInsertRequestDto.getDescription())
            .build());
        return reportRepository.findReportCountById(reportInsertRequestDto.getReviewId());
    }
}
