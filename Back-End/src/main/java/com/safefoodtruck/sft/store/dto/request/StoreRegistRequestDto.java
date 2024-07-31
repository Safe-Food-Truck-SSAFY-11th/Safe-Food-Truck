package com.safefoodtruck.sft.store.dto.request;

import java.util.List;

import com.safefoodtruck.sft.menu.domain.Menu;

public record StoreRegistRequestDto(String name, String storeType, String offDay, String description, String latitude, String longitude, String safetyLicenseNumber, boolean isOpen) {
}
