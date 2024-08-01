package com.safefoodtruck.sft.store.dto.response;

import com.safefoodtruck.sft.store.domain.Store;
import lombok.Builder;

@Builder
public record StoreRegistResponseDto(String email, String name, String storeType,
                                     String offDay, String description, String latitude,
                                     String longitude, String safetyLicenseNumber, Boolean isOpen) {

    public static StoreRegistResponseDto fromEntity(String email, Store store) {
        return StoreRegistResponseDto.builder()
            .name(store.getName())
            .email(email)
            .storeType(store.getStoreType())
            .offDay(store.getOffDay())
            .description(store.getDescription())
            .latitude(store.getLatitude())
            .longitude(store.getLongitude())
            .safetyLicenseNumber(store.getSafetyLicenseNumber())
            .isOpen(store.getIsOpen())
            .build();
    }
}
