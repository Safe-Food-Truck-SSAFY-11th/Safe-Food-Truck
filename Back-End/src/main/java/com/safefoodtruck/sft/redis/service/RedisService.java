package com.safefoodtruck.sft.redis.service;

import com.safefoodtruck.sft.redis.dto.RedisDto;

public interface RedisService {
	void setValue(RedisDto redisDto);
	String getValue(RedisDto redisDto);
	void deleteValue(RedisDto redisDto);
}
