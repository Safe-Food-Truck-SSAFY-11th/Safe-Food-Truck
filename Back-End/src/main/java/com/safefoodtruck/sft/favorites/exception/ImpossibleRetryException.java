package com.safefoodtruck.sft.favorites.exception;

public class ImpossibleRetryException extends RuntimeException {
    private static final String message = "당신은 이미 이 가게를 찜 하였습니다.";

    public ImpossibleRetryException() {
        super(message);
    }
}
