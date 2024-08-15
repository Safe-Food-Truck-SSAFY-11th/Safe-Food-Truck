package com.safefoodtruck.sft.store.dto.response;

import java.util.List;
import lombok.Builder;

@Builder
public record StoreInfoListResponseDto(Integer count, List<StoreInfoResponseDto> storeInfoResponseDtos) {
}
