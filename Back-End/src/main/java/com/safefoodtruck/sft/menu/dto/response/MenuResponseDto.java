package com.safefoodtruck.sft.menu.dto.response;

import com.safefoodtruck.sft.menu.domain.Menu;
import com.safefoodtruck.sft.menu.dto.MenuImageDto;

import lombok.Builder;

@Builder
public record MenuResponseDto(Integer menuId, String name, Integer price, String description, MenuImageDto menuImageDto) {
    public static MenuResponseDto fromEntity(Menu menu) {
        return MenuResponseDto.builder()
            .menuId(menu.getId())
            .name(menu.getName())
            .price(menu.getPrice())
            .description(menu.getDescription())
            .menuImageDto(MenuImageDto.fromEntity(menu.getMenuImage()))
            .build();
    }
}
