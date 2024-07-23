package com.safefoodtruck.sft.member.exception;

public class MemberDuplicateException extends RuntimeException {

    private static final String ERROR_MESSAGE = "이미 존재하는 회원입니다.";

    public MemberDuplicateException() {
        super(ERROR_MESSAGE);
    }
}
