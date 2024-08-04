package com.safefoodtruck.sft.store.dto.response;

import com.safefoodtruck.sft.store.domain.Store;
import com.safefoodtruck.sft.store.dto.StoreImageDto;

import lombok.Builder;

@Builder
public record StoreInfoResponseDto(Integer storeId, String name, String latitude, String longitude, StoreImageDto storeImageDto) {
    public StoreInfoResponseDto(Integer storeId, String name, String latitude, String longitude) {
        this(storeId, name, latitude, longitude, null);
    }

    public static StoreInfoResponseDto fromEntity(Store store) {
        return StoreInfoResponseDto.builder()
            .storeId(store.getId())
            .name(store.getName())
            .latitude(store.getLatitude())
            .longitude(store.getLongitude())
            .build();
    }
}
