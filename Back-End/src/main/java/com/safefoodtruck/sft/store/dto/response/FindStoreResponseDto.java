package com.safefoodtruck.sft.store.dto.response;

import com.safefoodtruck.sft.menu.dto.response.MenuListResponseDto;
import com.safefoodtruck.sft.menu.dto.response.MenuResponseDto;
import com.safefoodtruck.sft.store.domain.Store;
import java.util.List;
import lombok.Builder;

@Builder
public record FindStoreResponseDto(Integer storeId, String name, String storeType,
                                   MenuListResponseDto menuListResponseDto, String offDay,
                                   String description, String latitude, String longitude,
                                   String safetyLicenseNumber, Boolean isOpen) {

    public static FindStoreResponseDto fromEntity(Store store) {
        List<MenuResponseDto> menuResponseDtos = store.getMenuList().stream()
            .map(MenuResponseDto::fromEntity)
            .toList();

        return FindStoreResponseDto.builder()
            .storeId(store.getId())
            .name(store.getName())
            .storeType(store.getStoreType())
            .menuListResponseDto(new MenuListResponseDto(menuResponseDtos))
            .offDay(store.getOffDay())
            .description(store.getDescription())
            .latitude(store.getLatitude())
            .longitude(store.getLongitude())
            .safetyLicenseNumber(store.getSafetyLicenseNumber())
            .isOpen(store.getIsOpen())
            .build();
    }
}
