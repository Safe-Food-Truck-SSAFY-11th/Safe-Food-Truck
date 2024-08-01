package com.safefoodtruck.sft.favorites.service;

import com.safefoodtruck.sft.favorites.dto.response.SelectMemberFavoriteResponseDto;

public interface FavoritesService {
    SelectMemberFavoriteResponseDto selectMemberFavorite(String userEmail);
}
