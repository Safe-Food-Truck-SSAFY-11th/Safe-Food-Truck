package com.safefoodtruck.sft.store.dto.response;

import java.util.List;
import com.safefoodtruck.sft.menu.dto.response.MenuListResponseDto;
import com.safefoodtruck.sft.menu.dto.response.MenuResponseDto;
import com.safefoodtruck.sft.store.domain.Store;
import lombok.Builder;

@Builder
public record FindStoreResponseDto(Integer storeId, String name, String storeType,
                                   MenuListResponseDto menuListResponseDto, String offDay,
                                   String description, String latitude, String longitude,
                                   String safetyLicenseNumber, Boolean isOpen) {

    public static FindStoreResponseDto fromEntity(Store store) {
        return FindStoreResponseDto.builder()
            .storeId(store.getId())
            .name(store.getName())
            .storeType(store.getStoreType())
            .menuListResponseDto(createMenuListResponseDto(store))
            .offDay(store.getOffDay())
            .description(store.getDescription())
            .latitude(store.getLatitude())
            .longitude(store.getLongitude())
            .safetyLicenseNumber(store.getSafetyLicenseNumber())
            .isOpen(store.getIsOpen())
            .build();
    }

    private static MenuListResponseDto createMenuListResponseDto(Store store) {
        List<MenuResponseDto> menuResponseDtos = store.getMenuList().stream()
            .map(MenuResponseDto::fromEntity)
            .toList();

        return MenuListResponseDto.builder()
            .count(menuResponseDtos.size())
            .menuResponseDtos(menuResponseDtos)
            .build();
    }
}
