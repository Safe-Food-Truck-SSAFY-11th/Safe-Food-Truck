package com.safefoodtruck.sft.favorites.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SelectFavoriteResponseDto {
    private Integer storeId;
    private Long favoriteCount;
}
