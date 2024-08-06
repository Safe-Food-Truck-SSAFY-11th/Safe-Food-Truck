package com.safefoodtruck.sft.globalnotification.service;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public interface GlobalNotificationService {
    SseEmitter subscribe(String email);
    void sendToClient(String email, Object data, String comment, String eventName);
    SseEmitter createEmitter(String email);

}
