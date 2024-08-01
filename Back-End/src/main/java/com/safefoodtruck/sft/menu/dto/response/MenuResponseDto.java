package com.safefoodtruck.sft.menu.dto.response;

import com.safefoodtruck.sft.menu.domain.Menu;
import lombok.Builder;

@Builder
public record MenuResponseDto(String name, int price, String description) {
    public static MenuResponseDto fromEntity(Menu menu) {
        return MenuResponseDto.builder()
            .name(menu.getName())
            .price(menu.getPrice())
            .description(menu.getDescription())
            .build();
    }
}
