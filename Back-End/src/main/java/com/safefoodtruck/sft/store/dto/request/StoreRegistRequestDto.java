package com.safefoodtruck.sft.store.dto.request;

public record StoreRegistRequestDto(String name, String storeType, String offDay, String description, String safetyLicenseNumber, Boolean isOpen) {
}
