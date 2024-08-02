package com.safefoodtruck.sft.favorites.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MemberFavoritesDto {
    private Integer favoriteId;
    private Integer storeId;
}
