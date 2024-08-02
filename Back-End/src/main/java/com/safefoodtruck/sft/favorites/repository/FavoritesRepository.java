package com.safefoodtruck.sft.favorites.repository;

import com.safefoodtruck.sft.favorites.domain.Favorites;
import com.safefoodtruck.sft.favorites.dto.MemberFavoritesDto;
import com.safefoodtruck.sft.favorites.dto.response.SelectFavoriteResponseDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FavoritesRepository extends JpaRepository<Favorites, Integer> {

    @Query(value =
        "SELECT new com.safefoodtruck.sft.favorites.dto.MemberFavoritesDto(f.id, f.store.id) "
            +
            "FROM Favorites f " +
            "WHERE f.member.email = :email " +
            "ORDER BY f.id desc")
    List<MemberFavoritesDto> findByMember(@Param("email") String email);

    @Query(value =
        "SELECT new com.safefoodtruck.sft.favorites.dto.MemberFavoritesDto(f.id, f.store.id) "
            +
            "FROM Favorites f " +
            "WHERE f.member.email = :email " +
            "AND f.store.id = :storeId")
    MemberFavoritesDto findByMemberAndStore(@Param("email") String email, @Param("storeId") Integer storeId);

    @Query(value =
        "SELECT new com.safefoodtruck.sft.favorites.dto.response.SelectFavoriteResponseDto(f.store.id, count(f)) "
            +
            "FROM Favorites f " +
            "WHERE f.store.id = :storeId ")
    SelectFavoriteResponseDto findFavoritesCount(@Param("storeId") Integer storeId);
}
