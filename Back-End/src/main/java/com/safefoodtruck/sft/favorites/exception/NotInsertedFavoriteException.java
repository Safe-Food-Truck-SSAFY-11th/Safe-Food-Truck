package com.safefoodtruck.sft.favorites.exception;

public class NotInsertedFavoriteException extends RuntimeException {
    private static final String message = "당신은 이 가게를 찜한 적이 없습니다.";

    public NotInsertedFavoriteException() {
        super(message);
    }
}
