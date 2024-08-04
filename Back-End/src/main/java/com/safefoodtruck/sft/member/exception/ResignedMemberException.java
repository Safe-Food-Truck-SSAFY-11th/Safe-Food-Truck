package com.safefoodtruck.sft.member.exception;

public class ResignedMemberException extends RuntimeException {
    private static final String message = "해당회원은 탈퇴한 회원입니다.";

    public ResignedMemberException() {
        super(message);
    }
}
