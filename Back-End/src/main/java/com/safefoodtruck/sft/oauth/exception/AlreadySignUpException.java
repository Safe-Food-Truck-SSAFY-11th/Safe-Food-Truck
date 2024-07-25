package com.safefoodtruck.sft.oauth.exception;

public class AlreadySignUpException extends RuntimeException {
    public AlreadySignUpException(String message) {
        super(message);
    }
}
