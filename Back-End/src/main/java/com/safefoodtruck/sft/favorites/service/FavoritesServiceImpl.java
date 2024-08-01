package com.safefoodtruck.sft.favorites.service;

import com.safefoodtruck.sft.favorites.dto.response.SelectMemberFavoriteResponseDto;
import com.safefoodtruck.sft.favorites.repository.FavoritesRepository;
import groovy.util.logging.Slf4j;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class FavoritesServiceImpl implements FavoritesService  {

    private final FavoritesRepository favoritesRepository;

    @Override
    public SelectMemberFavoriteResponseDto selectMemberFavorite(String userEmail) {
        return SelectMemberFavoriteResponseDto.builder()
                .memberFavoriteList(favoritesRepository.findByMember(userEmail))
                .build();
    }
}
