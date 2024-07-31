package com.safefoodtruck.sft.store.dto.response;

import com.safefoodtruck.sft.store.domain.Store;
import lombok.Builder;

@Builder
public record StoreInfoResponseDto(int storeId, String name, String latitude, String longitude) {
    public static StoreInfoResponseDto fromEntity(Store store) {
        return StoreInfoResponseDto.builder()
            .storeId(store.getId())
            .name(store.getName())
            .latitude(store.getLatitude())
            .longitude(store.getLongitude())
            .build();
    }
}
