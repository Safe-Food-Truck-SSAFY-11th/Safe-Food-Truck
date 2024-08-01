package com.safefoodtruck.sft.notification.exception;

public class NotFoundNotificationException extends RuntimeException {

    private static final String message = "해당하는 알림이 존재하지 않거나 잘못된 알림 id 입니다";

    public NotFoundNotificationException() {
        super(message);
    }
}
