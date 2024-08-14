package com.safefoodtruck.sft.globalnotification.service;

import com.safefoodtruck.sft.globalnotification.repository.EmitterRepository;
import java.io.IOException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Service
@RequiredArgsConstructor
public class GlobalNotificationServiceImpl implements GlobalNotificationService {

    private static final Long DEFAULT_TIMEOUT = 1000L * 60 * 60; //1시간

    private final EmitterRepository emitterRepository;

    @Override
    public SseEmitter subscribe(String email) {
        SseEmitter emitter = createEmitter(email);
        System.out.println("@@@@@@@@@@@@@@@@@@@@ = " + emitterRepository.get(email));
        sendToClient(email, "연결완료!", "connect", "connected");
        return emitter;
    }

    @Override
    public void sendToClient(String email, Object data, String comment, String eventName) {
        List<SseEmitter> emitterList = emitterRepository.get(email);
        if (emitterList == null) return;
        for (SseEmitter emitter : emitterList) {
            if (emitter != null) {
                try {
                    emitter.send(SseEmitter.event()
                        .id(email)
                        .name(eventName)
                        .data(data)
                        .comment(comment));
                } catch (IOException e) {
                    emitterRepository.delete(email, emitter);
                    emitter.completeWithError(e);
                }
            }
        }

    }

    @Override
    public SseEmitter createEmitter(String email) {
        System.out.println("@@@@@@@@@@@@@@@@@@@@@AAAAAAAAAAAAAAA");
        SseEmitter emitter = new SseEmitter(DEFAULT_TIMEOUT);
        emitterRepository.save(email, emitter);
        emitter.onCompletion(() -> {
            emitterRepository.delete(email, emitter); // 완료된 Emitter 삭제
        });
        emitter.onTimeout(() -> {
            emitterRepository.delete(email, emitter); // 완료된 Emitter 삭제
        });
        return emitter;
    }


}