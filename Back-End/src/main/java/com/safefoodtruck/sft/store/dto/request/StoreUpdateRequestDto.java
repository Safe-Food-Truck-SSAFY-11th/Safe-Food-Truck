package com.safefoodtruck.sft.store.dto.request;

public record StoreUpdateRequestDto(String name, String storeType, String offDay, String description) {
    //StoreIamge 추후 추가 예정
}
