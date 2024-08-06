package com.safefoodtruck.sft.globalnotification.service;

import com.safefoodtruck.sft.globalnotification.repository.EmitterRepository;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Service
@RequiredArgsConstructor
public class GlobalNotificationServiceImpl implements GlobalNotificationService {

    private static final Long DEFAULT_TIMEOUT = 600L * 1000 * 60;

    private final EmitterRepository emitterRepository;

    @Override
    public SseEmitter subscribe(String email) {
        SseEmitter emitter = createEmitter(email);

        //sendToClient(email, "연결완료!" , "sse 접속 성공");
        return emitter;
    }

    @Override
    public void notify(String email, Object data, String comment) {
        sendToClient(email, data, comment);
    }

    @Override
    public void sendToClient(String email, Object data, String comment) {
        SseEmitter emitter = emitterRepository.get(email);
        if (emitter != null) {
            try {
                System.out.println("FFFF");
                emitter.send(SseEmitter.event()
                    .id(email)
                    .name("SSE")
                    .data(data)
                    .comment(comment));
            } catch (IOException e) {
                emitterRepository.deleteById(email);
                emitter.completeWithError(e);
            }
        }
    }

    @Override
    public SseEmitter createEmitter(String email) {
        SseEmitter emitter = new SseEmitter(DEFAULT_TIMEOUT);
        emitterRepository.save(email, emitter);
        System.out.println(emitterRepository.get(email));
        emitter.onCompletion(() -> emitterRepository.deleteById(email));
        emitter.onTimeout(() -> emitterRepository.deleteById(email));

        return emitter;
    }


}

class MM {
    private String name;

    public MM(String name) {
        this.name = name;
    }
    }