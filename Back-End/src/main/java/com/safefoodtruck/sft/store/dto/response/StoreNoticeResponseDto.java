package com.safefoodtruck.sft.store.dto.response;

import com.safefoodtruck.sft.store.domain.Store;
import lombok.Builder;

@Builder
public record StoreNoticeResponseDto(Integer storeId, String ownerNickname, String notice) {

    public static StoreNoticeResponseDto fromEntity(Store store) {
        return StoreNoticeResponseDto.builder()
            .storeId(store.getId())
            .ownerNickname(store.getOwner().getNickname())
            .notice(store.getNotice())
            .build();
    }
}
