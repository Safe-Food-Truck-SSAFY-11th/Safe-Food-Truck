package com.safefoodtruck.sft.store.dto.request;

import com.safefoodtruck.sft.store.domain.StoreImage;

public record StoreUpdateRequestDto(String name, String storeType, String offDay, StoreImage storeImage, String description) {
}
