
package com.safefoodtruck.sft.store.dto.response;

import com.safefoodtruck.sft.store.domain.Store;
import lombok.Builder;

@Builder
public record StoreUpdateResponseDto(String name, String storeType, String offDay, String description) {
	public static StoreUpdateResponseDto fromEntity(Store store) {
		return StoreUpdateResponseDto.builder()
			.name(store.getName())
			.storeType(store.getStoreType())
			.offDay(store.getOffDay())
			.description(store.getDescription())
			.build();
	}
}
