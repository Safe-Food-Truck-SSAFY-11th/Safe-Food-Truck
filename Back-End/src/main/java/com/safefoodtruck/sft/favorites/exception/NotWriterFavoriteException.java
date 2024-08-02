package com.safefoodtruck.sft.favorites.exception;

public class NotWriterFavoriteException extends RuntimeException {
    private static final String message = "당신은 이 가게를 찜한 사람이 아닙니다.";

    public NotWriterFavoriteException() {
        super(message);
    }
}
