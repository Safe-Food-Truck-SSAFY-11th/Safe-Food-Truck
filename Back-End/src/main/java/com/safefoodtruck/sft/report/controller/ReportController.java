package com.safefoodtruck.sft.report.controller;

import com.safefoodtruck.sft.common.dto.ErrorResponseDto;
import com.safefoodtruck.sft.common.util.MemberInfo;
import com.safefoodtruck.sft.report.dto.request.ReportInsertRequestDto;
import com.safefoodtruck.sft.report.dto.response.ReportInsertResponseDto;
import com.safefoodtruck.sft.report.dto.response.ReportSelectResponseDto;
import com.safefoodtruck.sft.report.exception.NotFoundReviewException;
import com.safefoodtruck.sft.report.service.ReportService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/reports")
@RestController
@RequiredArgsConstructor
@Slf4j
public class ReportController {

    private final ReportService reportService;

    @GetMapping("/{reviewId}")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "신고 했는지 조회", description = "해당 유저가 해당 리뷰를 신고했는지 확인할 때 사용하는 API")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200",
            description = "true or false",
            content = @Content(mediaType = "application/json")),
        @ApiResponse(responseCode = "500",
            description = "Error Message로 전달함",
            content = @Content(mediaType = "application/json"))
    })
    public ResponseEntity<?> selectReport(@PathVariable("reviewId") Integer reviewId) {
        String userEmail = MemberInfo.getEmail();
        ReportSelectResponseDto reportSelectResponseDto = reportService.selectReport(userEmail,
            reviewId);
        return ResponseEntity.status(HttpStatus.OK).body(reportSelectResponseDto);
    }

    @PostMapping()
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "신고 하기", description = "리뷰 신고시 사용하는 API")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200",
            description = "리뷰 신고가 정상적으로 등록되었습니다.",
            content = @Content(mediaType = "application/json")),
        @ApiResponse(responseCode = "500",
            description = "Error Message로 전달함",
            content = @Content(mediaType = "application/json"))
    })
    public ResponseEntity<?> insertReport(
        @RequestBody ReportInsertRequestDto reportInsertRequestDto
    ) {
        String userEmail = MemberInfo.getEmail();
        ReportInsertResponseDto reportInsertResponseDto = reportService.insertReport(userEmail,
            reportInsertRequestDto);
        return ResponseEntity.status(HttpStatus.OK).body(reportInsertResponseDto);
    }

    @ExceptionHandler({NotFoundReviewException.class})
    public ResponseEntity<?> reportsExceptionHandler(NotFoundReviewException e) {
        log.error("Report 에러: {}", e.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
            .contentType(MediaType.APPLICATION_JSON)
            .body(new ErrorResponseDto(
                    HttpStatus.BAD_REQUEST.value(),
                    e.getMessage(),
                    LocalDateTime.now()
                )
            );
    }
}
