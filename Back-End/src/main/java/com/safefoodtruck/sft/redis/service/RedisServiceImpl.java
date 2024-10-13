package com.safefoodtruck.sft.redis.service;

import com.safefoodtruck.sft.redis.dto.OpenviduDto;
import com.safefoodtruck.sft.store.dto.response.StoreFindResponseDto;
import com.safefoodtruck.sft.store.service.StoreService;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.Set;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import com.safefoodtruck.sft.redis.dto.RedisDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class RedisServiceImpl implements RedisService {

	private final RedisTemplate<String, Object> redisTemplate;
    private final StoreService storeService;

    @Override
    public void setValue(RedisDto redisDto) {
        String key = redisDto.key();
        Object value = redisDto.value();
        log.info("Setting value for key: {}", key);
        redisTemplate.opsForValue().set(key, value);
    }

    @Override
    public String getValue(String key) {
        log.info("Getting value for key: {}", key);
        Object value = redisTemplate.opsForValue().get(key);
        return value != null ? value.toString() : null;
    }

    @Override
    public void deleteValue(RedisDto redisDto) {
        String key = redisDto.key();
        log.info("Deleting value for key: {}", key);
        redisTemplate.delete(key);
    }

    @Override
    public ArrayList<OpenviduDto> getLiveList() {
        Set<String> keys = redisTemplate.keys("*");
        ArrayList<OpenviduDto> redisDtos = new ArrayList<>();
        if (keys != null) {
            for (String key : keys) {
                // 각 키에 대해 값을 조회
                Integer value = Integer.parseInt((String) redisTemplate.opsForValue().get(key));
                StoreFindResponseDto storeInfo = storeService.findStoreById(Integer.parseInt(key));
                // RedisDto 객체로 리스트에 추가
                if (value != null) {
                    redisDtos.add(new OpenviduDto(key, value, storeInfo));
                }
            }
            // 값(value)을 기준으로 내림차순 정렬
            redisDtos.sort(Comparator.comparing(OpenviduDto::value).reversed());
        }
        return redisDtos;
    }
}
