package com.safefoodtruck.sft.globalnotification.service;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public interface GlobalNotificationService {
    SseEmitter subscribe(String email);
    void notify(String email, Object data, String comment);
    void sendToClient(String email, Object data, String comment);
    SseEmitter createEmitter(String email);

}
