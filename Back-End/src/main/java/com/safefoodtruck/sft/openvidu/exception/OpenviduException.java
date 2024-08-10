package com.safefoodtruck.sft.openvidu.exception;

public class OpenviduException extends RuntimeException {
    private String message;

    public OpenviduException(String message) {
        super(message);
    }
}
