package com.safefoodtruck.sft.store.dto.response;

import com.safefoodtruck.sft.store.domain.Store;
import com.safefoodtruck.sft.store.dto.StoreImageDto;

import lombok.Builder;

@Builder
public record StoreInfoResponseDto(Integer storeId, String name, String storeType, String latitude, String longitude, StoreImageDto storeImageDto, Integer averageStar) {
    public static StoreInfoResponseDto fromEntity(Store store, Integer averageStar) {
        return StoreInfoResponseDto.builder()
            .storeId(store.getId())
            .name(store.getName())
            .storeType(store.getStoreType())
            .latitude(store.getLatitude())
            .longitude(store.getLongitude())
            .storeImageDto(StoreImageDto.fromEntity(store.getStoreImage()))
            .averageStar(averageStar)
            .build();
    }
}
