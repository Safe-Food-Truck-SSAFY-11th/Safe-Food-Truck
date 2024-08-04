package com.safefoodtruck.sft.store.dto;

import com.safefoodtruck.sft.store.domain.Store;
import com.safefoodtruck.sft.store.domain.StoreImage;

import lombok.Builder;

@Builder
public record StoreImageDto(Store store, String savedUrl, String savedPath) {
	public static StoreImageDto fromEntity(StoreImage storeImage) {
		return StoreImageDto.builder()
			.store(storeImage.getStore())
			.savedUrl(storeImage.getSavedUrl())
			.savedPath(storeImage.getSavedPath())
			.build();
	}
}
