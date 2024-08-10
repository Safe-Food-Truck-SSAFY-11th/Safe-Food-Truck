package com.safefoodtruck.sft.openvidu.exception;

public class NullSessionException extends RuntimeException {
    private static final String message = "세션이 NULL 입니다.";

    public NullSessionException() {
        super(message);
    }
}
