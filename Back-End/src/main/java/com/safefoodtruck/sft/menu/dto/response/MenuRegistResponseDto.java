package com.safefoodtruck.sft.menu.dto.response;

import com.safefoodtruck.sft.menu.domain.Menu;
import com.safefoodtruck.sft.store.domain.Store;
import lombok.Builder;

@Builder
public record MenuRegistResponseDto(Store store, String name, int price, String description) {
    public static MenuRegistResponseDto fromEntity(Menu menu) {
        return MenuRegistResponseDto.builder()
            .store(menu.getStore())
            .name(menu.getName())
            .price(menu.getPrice())
            .description(menu.getDescription())
            .build();
    }
}
