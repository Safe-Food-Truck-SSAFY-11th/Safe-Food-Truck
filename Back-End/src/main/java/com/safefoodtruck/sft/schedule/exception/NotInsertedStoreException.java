package com.safefoodtruck.sft.schedule.exception;

public class NotInsertedStoreException extends RuntimeException {
    private static final String message = "점포를 등록하지 않은 사장님 입니다.";

    public NotInsertedStoreException() {
        super(message);
    }
}
