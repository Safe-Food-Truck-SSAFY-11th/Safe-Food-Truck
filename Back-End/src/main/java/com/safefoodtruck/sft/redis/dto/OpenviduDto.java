package com.safefoodtruck.sft.redis.dto;

import com.safefoodtruck.sft.store.dto.response.StoreFindResponseDto;

public record OpenviduDto(String key, Integer value, StoreFindResponseDto storeInfo) {
}
