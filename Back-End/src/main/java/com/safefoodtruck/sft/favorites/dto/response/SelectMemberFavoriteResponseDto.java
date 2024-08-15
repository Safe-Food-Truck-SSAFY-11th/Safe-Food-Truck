package com.safefoodtruck.sft.favorites.dto.response;

import com.safefoodtruck.sft.favorites.dto.MemberFavoritesDto;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
public class SelectMemberFavoriteResponseDto {
    private List<MemberFavoritesDto> memberFavoriteList;
    private Integer size;

    @Builder
    public SelectMemberFavoriteResponseDto(List<MemberFavoritesDto> memberFavoriteList) {
        this.memberFavoriteList = memberFavoriteList;
        this.size = memberFavoriteList.size();
    }
}
