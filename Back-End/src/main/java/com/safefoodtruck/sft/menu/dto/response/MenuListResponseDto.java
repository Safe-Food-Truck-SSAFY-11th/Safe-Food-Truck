package com.safefoodtruck.sft.menu.dto.response;

import java.util.List;

import lombok.Builder;

@Builder
public record MenuListResponseDto(Integer count, List<MenuResponseDto> menuResponseDtos) {
}
