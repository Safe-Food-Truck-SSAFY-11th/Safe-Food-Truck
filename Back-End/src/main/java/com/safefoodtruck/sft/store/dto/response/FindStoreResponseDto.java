package com.safefoodtruck.sft.store.dto.response;

import java.util.List;

import com.safefoodtruck.sft.menu.domain.Menu;
import com.safefoodtruck.sft.store.domain.Store;

import lombok.Builder;

@Builder
public record FindStoreResponseDto(Integer storeId, String name, String storeType, List<Menu> menus, String offDay, String description, String latitude, String longitude, String safetyLicenseNumber, boolean isOpen) {
    public static FindStoreResponseDto fromEntity(Store store) {
        return FindStoreResponseDto.builder()
            .storeId(store.getId())
            .name(store.getName())
            .storeType(store.getStoreType())
            .menus(store.getMenuList())
            .offDay(store.getOffDay())
            .description(store.getDescription())
            .latitude(store.getLatitude())
            .longitude(store.getLongitude())
            .safetyLicenseNumber(store.getSafetyLicenseNumber())
            .isOpen(store.getIsOpen())
            .build();
    }
}
