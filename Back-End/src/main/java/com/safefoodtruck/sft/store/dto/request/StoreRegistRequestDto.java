package com.safefoodtruck.sft.store.dto.request;

import com.safefoodtruck.sft.store.dto.StoreImageDto;

public record StoreRegistRequestDto(String name, String storeType, String offDay, String description, String safetyLicenseNumber, Boolean isOpen, StoreImageDto storeImageDto) {
}
