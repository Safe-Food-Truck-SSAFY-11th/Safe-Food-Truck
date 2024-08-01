package com.safefoodtruck.sft.notification.exception;

public class NotSameUserException extends RuntimeException {
    private static final String message = "로그인한 email과 알림을 받은 email이 일치하지 않습니다.";

    public NotSameUserException() {
        super(message);
    }
}
