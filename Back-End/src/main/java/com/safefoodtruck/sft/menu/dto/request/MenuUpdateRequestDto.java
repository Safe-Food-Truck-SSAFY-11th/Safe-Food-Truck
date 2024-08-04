package com.safefoodtruck.sft.menu.dto.request;

import com.safefoodtruck.sft.menu.dto.MenuImageDto;

public record MenuUpdateRequestDto(String name, Integer price, String description, MenuImageDto menuImageDto) {

}
