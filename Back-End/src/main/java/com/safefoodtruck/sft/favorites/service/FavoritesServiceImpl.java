package com.safefoodtruck.sft.favorites.service;

import com.safefoodtruck.sft.favorites.domain.Favorites;
import com.safefoodtruck.sft.favorites.dto.MemberFavoritesDto;
import com.safefoodtruck.sft.favorites.dto.response.SelectMemberFavoriteResponseDto;
import com.safefoodtruck.sft.favorites.exception.ImpossibleRetryException;
import com.safefoodtruck.sft.favorites.exception.NotInsertedFavoriteException;
import com.safefoodtruck.sft.favorites.exception.NotWriterFavoriteException;
import com.safefoodtruck.sft.favorites.repository.FavoritesRepository;
import com.safefoodtruck.sft.member.domain.Member;
import com.safefoodtruck.sft.member.repository.MemberRepository;
import com.safefoodtruck.sft.store.domain.Store;
import com.safefoodtruck.sft.store.repository.StoreRepository;
import groovy.util.logging.Slf4j;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class FavoritesServiceImpl implements FavoritesService {

    private final FavoritesRepository favoritesRepository;
    private final MemberRepository memberRepository;
    private final StoreRepository storeRepository;

    @Override
    public SelectMemberFavoriteResponseDto selectMemberFavorite(String userEmail) {
        return SelectMemberFavoriteResponseDto.builder()
            .memberFavoriteList(favoritesRepository.findByMember(userEmail))
            .build();
    }

    @Override
    public void insertMemberFavorite(String userEmail, Integer storeId) {
        MemberFavoritesDto memberFavoritesDto = favoritesRepository.findByMemberAndStore(userEmail,
            storeId);
        if (memberFavoritesDto != null) {
            throw new ImpossibleRetryException();
        }
        Member member = memberRepository.findByEmail(userEmail);
        Store store = storeRepository.findById(storeId).get();
        favoritesRepository.save(Favorites.builder()
            .member(member)
            .store(store)
            .build()
        );
    }

    @Override
    public void deleteMemberFavorite(String userEmail, Integer favoriteId) {
        Favorites favorites = favoritesRepository.findById(favoriteId).orElseThrow(
            NotInsertedFavoriteException::new
        );
        String writer = favorites.getMember().getEmail();
        if (!writer.equals(userEmail)) {
            throw new NotWriterFavoriteException();
        }
        favoritesRepository.delete(favorites);
    }
}
