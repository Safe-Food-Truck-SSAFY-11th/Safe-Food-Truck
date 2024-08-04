package com.safefoodtruck.sft.notification.exception;

public class NotSameUserException extends RuntimeException {
    private static final String message = "요청을 보낸 email과 실제 등록된 email이 일치하지 않습니다.";

    public NotSameUserException() {
        super(message);
    }
}
