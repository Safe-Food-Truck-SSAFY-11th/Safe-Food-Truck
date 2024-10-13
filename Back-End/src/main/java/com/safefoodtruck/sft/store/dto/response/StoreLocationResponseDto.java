package com.safefoodtruck.sft.store.dto.response;

import com.safefoodtruck.sft.store.domain.Store;
import lombok.Builder;

@Builder
public record StoreLocationResponseDto(String latitude, String longitude) {
    public static StoreLocationResponseDto fromEntity(Store store) {
        return StoreLocationResponseDto.builder()
            .latitude(store.getLatitude())
            .longitude(store.getLongitude())
            .build();
    }
}
