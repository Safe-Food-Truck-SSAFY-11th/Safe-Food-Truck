package com.safefoodtruck.sft.store.dto.request;

import com.safefoodtruck.sft.store.dto.StoreImageDto;

public record StoreUpdateRequestDto(String name, String storeType, String offDay, String description, StoreImageDto storeImageDto) {
}
