package com.safefoodtruck.sft.member.exception;

public class NotFoundMemberException extends RuntimeException {

    private static final String ERROR_MESSAGE = "해당 회원을 찾을 수 없습니다.";

    public NotFoundMemberException() {
        super(ERROR_MESSAGE);
    }
}
