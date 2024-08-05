package com.safefoodtruck.sft.order.dto.response;

import java.util.List;

import com.safefoodtruck.sft.menu.domain.Menu;
import com.safefoodtruck.sft.menu.dto.response.MenuResponseDto;
import com.safefoodtruck.sft.order.domain.Order;
import com.safefoodtruck.sft.review.domain.Review;
import com.safefoodtruck.sft.review.dto.ReviewImageDto;

import lombok.Builder;

@Builder
public record CustomerOrderResponseDto(Integer orderId, String storeName, List<MenuResponseDto> menuResponseDtos, List<ReviewImageDto> reviewImageDtos) {

	public static CustomerOrderResponseDto fromEntity(Order order, List<Menu> menus) {
		return CustomerOrderResponseDto.builder()
			.orderId(order.getId())
			.storeName(order.getStore().getName())
			.menuResponseDtos(convertMenusToDto(menus))
			.reviewImageDtos(convertReviewImagesToDto(order.getReview()))
			.build();
	}

	private static List<MenuResponseDto> convertMenusToDto(List<Menu> menus) {
		return menus.stream()
			.map(MenuResponseDto::fromEntity)
			.toList();
	}

	private static List<ReviewImageDto> convertReviewImagesToDto(Review review) {
		if (review == null) {
			return List.of();
		}

		return review.getReviewImages().stream()
			.map(ReviewImageDto::fromEntity)
			.toList();
	}
}
