package com.safefoodtruck.sft.survey.exception;

public class UnSatisfyLengthException extends RuntimeException {
    private static final String message = "수요조사는 최소 1개 이상에서 최대 3개 까지만 등록 가능합니다.";

    public UnSatisfyLengthException() {
        super(message);
    }
}
