package com.safefoodtruck.sft.survey.exception;

public class AlreadyRegisteredEmailException extends RuntimeException {
    private static final String message = "수요조사는 email당 하루 1회만 신청할 수 있습니다.";

    public AlreadyRegisteredEmailException() {
        super(message);
    }
}
