package com.safefoodtruck.sft.globalnotification.repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Repository
@RequiredArgsConstructor
public class EmitterRepository {

    private final Map<String, List<SseEmitter>> emitters = new ConcurrentHashMap<>();

    public void save(String email, SseEmitter emitter) {
        if (!emitters.containsKey(email)) {
            emitters.put(email, new ArrayList<>());
        }
        emitters.get(email).add(emitter);
    }

    public void delete(String email, SseEmitter emitterToRemove) {
        if (!emitters.containsKey(email) || emitters.get(email).isEmpty()) {
            return;
        }

        List<SseEmitter> emitterList = emitters.get(email);
        if (emitterList != null) {
            emitterList.remove(emitterToRemove); // 특정 SseEmitter 삭제
            if (emitterList.isEmpty()) {
                emitters.remove(email); // 리스트가 비면 map에서 키 삭제
            }
        }
    }

    public List<SseEmitter> get(String email) {
        return emitters.get(email);
    }
}
