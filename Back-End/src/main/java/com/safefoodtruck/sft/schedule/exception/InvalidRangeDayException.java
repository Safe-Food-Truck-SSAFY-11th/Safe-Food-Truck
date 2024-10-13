package com.safefoodtruck.sft.schedule.exception;

public class InvalidRangeDayException extends RuntimeException {
    private static final String message = "스케줄 Day는 월(0)~일(6)까지만 가능합니다.";

    public InvalidRangeDayException() {
        super(message);
    }
}
