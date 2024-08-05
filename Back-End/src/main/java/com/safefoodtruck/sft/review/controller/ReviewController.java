package com.safefoodtruck.sft.review.controller;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.NO_CONTENT;
import static org.springframework.http.HttpStatus.OK;

import com.safefoodtruck.sft.common.dto.ErrorResponseDto;
import com.safefoodtruck.sft.review.dto.request.ReviewRegistRequestDto;
import com.safefoodtruck.sft.review.dto.response.ReviewListResponseDto;
import com.safefoodtruck.sft.review.dto.response.ReviewResponseDto;
import com.safefoodtruck.sft.review.exception.ReviewNotFoundException;
import com.safefoodtruck.sft.review.service.ReviewService;
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
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequestMapping("/reviews")
@RestController
@RequiredArgsConstructor
public class ReviewController {

	private final ReviewService reviewService;

	@PostMapping
	@PreAuthorize("hasAnyRole('ROLE_customer', 'ROLE_vip_customer')")
	@Operation(summary = "리뷰 등록", description = "리뷰를 등록할 때 사용하는 API")
	@ApiResponses(value = {
		@ApiResponse(
			responseCode = "201",
			description = "리뷰 등록에 성공하였습니다!",
			content = @Content(mediaType = "application/json")
		),
		@ApiResponse(
			responseCode = "500",
			description = "Error Message 로 전달함",
			content = @Content(mediaType = "application/json")
		)
	})
	public ResponseEntity<ReviewResponseDto> registReview(
		@RequestBody ReviewRegistRequestDto reviewRegistRequestDto) {
		ReviewResponseDto reviewResponseDto = reviewService.registReview(reviewRegistRequestDto);
		return new ResponseEntity<>(reviewResponseDto, CREATED);
	}

	@GetMapping
	@PreAuthorize("hasAnyRole('ROLE_customer', 'ROLE_vip_customer')")
	@Operation(summary = "내가 쓴 리뷰 조회", description = "내가 쓴 리뷰를 조회할 때 사용하는 API")
	@ApiResponses(value = {
		@ApiResponse(
			responseCode = "200",
			description = "리뷰 조회에 성공하였습니다!",
			content = @Content(mediaType = "application/json")
		),
		@ApiResponse(
			responseCode = "500",
			description = "Error Message 로 전달함",
			content = @Content(mediaType = "application/json")
		)
	})
	public ResponseEntity<ReviewListResponseDto> findCustomerReviews() {
		ReviewListResponseDto customerReviews = reviewService.findCustomerReviews();
		return new ResponseEntity<>(customerReviews, OK);
	}

	@GetMapping("{storeId}")
	@PreAuthorize("isAuthenticated()")
	@Operation(summary = "점포 리뷰 조회", description = "점포 리뷰를 조회할 때 사용하는 API")
	@ApiResponses(value = {
		@ApiResponse(
			responseCode = "200",
			description = "점포 리뷰 조회에 성공하였습니다!",
			content = @Content(mediaType = "application/json")
		),
		@ApiResponse(
			responseCode = "500",
			description = "Error Message 로 전달함",
			content = @Content(mediaType = "application/json")
		)
	})
	public ResponseEntity<ReviewListResponseDto> findStoreReviews(
		@PathVariable final Integer storeId) {
		ReviewListResponseDto storeReviews = reviewService.findStoreReviews(storeId);
		return new ResponseEntity<>(storeReviews, OK);
	}

	@GetMapping("{storeId}/stars")
	@PreAuthorize("isAuthenticated()")
	@Operation(summary = "점포 별점 조회", description = "점포 별점을 조회할 때 사용하는 API")
	@ApiResponses(value = {
		@ApiResponse(
			responseCode = "200",
			description = "점포 별점 조회에 성공하였습니다!",
			content = @Content(mediaType = "application/json")
		),
		@ApiResponse(
			responseCode = "500",
			description = "Error Message 로 전달함",
			content = @Content(mediaType = "application/json")
		)
	})
	public ResponseEntity<Integer> findStoreStars(
		@PathVariable final Integer storeId) {
		Integer storeStars = reviewService.findStoreStars(storeId);
		return new ResponseEntity<>(storeStars, OK);
	}

	@DeleteMapping("{reviewId}")
	@PreAuthorize("hasAnyRole('ROLE_customer', 'ROLE_vip_customer')")
	@Operation(summary = "리뷰 삭제", description = "리뷰를 삭제할 때 사용하는 API")
	@ApiResponses(value = {
		@ApiResponse(
			responseCode = "204",
			description = "리뷰 삭제에 성공하였습니다!",
			content = @Content(mediaType = "application/json")
		),
		@ApiResponse(
			responseCode = "500",
			description = "Error Message 로 전달함",
			content = @Content(mediaType = "application/json")
		)
	})
	public ResponseEntity<Void> deleteReview(@PathVariable Integer reviewId) {
		reviewService.deleteReview(reviewId);
		return new ResponseEntity<>(NO_CONTENT);
	}

	@ExceptionHandler({ReviewNotFoundException.class})
	public ResponseEntity<ErrorResponseDto> reviewException(Exception e) {
		ErrorResponseDto errorResponse = new ErrorResponseDto(
			HttpStatus.INTERNAL_SERVER_ERROR.value(),
			e.getMessage(),
			LocalDateTime.now()
		);
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
			.contentType(MediaType.APPLICATION_JSON)
			.body(errorResponse);
	}
}
