package com.safefoodtruck.sft.redis.service;

import com.safefoodtruck.sft.redis.dto.OpenviduDto;
import com.safefoodtruck.sft.redis.dto.RedisDto;
import java.util.ArrayList;

public interface RedisService {
	void setValue(RedisDto redisDto);
	String getValue(String key);
	void deleteValue(RedisDto redisDto);
	ArrayList<OpenviduDto> getLiveList();
}
