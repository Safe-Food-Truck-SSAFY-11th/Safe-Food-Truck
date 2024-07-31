package com.safefoodtruck.sft.menu.dto.request;

import java.util.ArrayList;
import java.util.List;

public record MenuListRegistRequestDto(List<MenuRegistRequestDto> menuRegistRequestDtos) {
    public MenuListRegistRequestDto {
        menuRegistRequestDtos = new ArrayList<>();
    }
}
