package com.safefoodtruck.sft.menu.dto.response;

import com.safefoodtruck.sft.menu.domain.Menu;
import com.safefoodtruck.sft.menu.domain.MenuImage;

import lombok.Builder;

@Builder
public record MenuResponseDto(Integer menuId, String name, Integer price, String description, MenuImage menuImage) {
    public static MenuResponseDto fromEntity(Menu menu) {
        return MenuResponseDto.builder()
            .menuId(menu.getId())
            .name(menu.getName())
            .price(menu.getPrice())
            .description(menu.getDescription())
            .menuImage(menu.getMenuImage())
            .build();
    }
}
