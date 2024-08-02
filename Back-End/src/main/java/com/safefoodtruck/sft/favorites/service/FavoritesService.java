package com.safefoodtruck.sft.favorites.service;

import com.safefoodtruck.sft.favorites.dto.response.SelectFavoriteResponseDto;
import com.safefoodtruck.sft.favorites.dto.response.SelectMemberFavoriteResponseDto;

public interface FavoritesService {
    SelectMemberFavoriteResponseDto selectMemberFavorite(String userEmail);
    void insertMemberFavorite(String userEmail, Integer storeId);
    void deleteMemberFavorite(String userEmail, Integer storeId);
    SelectFavoriteResponseDto selectFavoriteCount(Integer storeId);
}
