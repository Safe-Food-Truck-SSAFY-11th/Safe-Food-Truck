package com.safefoodtruck.sft.redis.dto;

import lombok.Builder;

@Builder
public record RedisDto(String key, String value) {
}
