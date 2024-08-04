package com.safefoodtruck.sft.schedule.exception;

public class NotInsertedScheduleException extends RuntimeException {
    private static final String message = "등록되지 않은 스케줄입니다.";

    public NotInsertedScheduleException() {
        super(message);
    }
}
