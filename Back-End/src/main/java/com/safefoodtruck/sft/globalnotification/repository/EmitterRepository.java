package com.safefoodtruck.sft.globalnotification.repository;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Repository
@RequiredArgsConstructor
public class EmitterRepository {

    private final Map<String, SseEmitter> emitters = new ConcurrentHashMap<>();

    public void save(String email, SseEmitter emitter) {
        emitters.put(email, emitter);
    }

    public void deleteById(String email) {
        emitters.remove(email);
    }

    public SseEmitter get(String email) {
        return emitters.get(email);
    }
}
