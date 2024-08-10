package com.safefoodtruck.sft.redis.service;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import com.safefoodtruck.sft.redis.dto.RedisDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class RedisServiceImpl implements RedisService {

	private final StringRedisTemplate stringRedisTemplate;
	private final RedisTemplate<String, Object> redisTemplate;

	@Override
	public void setValue(RedisDto redisDto) {
		String key = redisDto.getKey();
		Object value = redisDto.getValue();
		log.info("Setting value for key: {}", key);
		redisTemplate.opsForValue().set(key, value);
	}

	@Override
	public String getValue(RedisDto redisDto) {
		String key = redisDto.getKey();
		log.info("Getting value for key: {}", key);
		Object value = redisTemplate.opsForValue().get(key);
		return value != null ? value.toString() : null;
	}

	@Override
	public void deleteValue(RedisDto redisDto) {
		String key = redisDto.getKey();
		log.info("Deleting value for key: {}", key);
		redisTemplate.delete(key);
	}
}
