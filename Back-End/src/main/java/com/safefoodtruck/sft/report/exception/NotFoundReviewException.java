package com.safefoodtruck.sft.report.exception;

public class NotFoundReviewException extends RuntimeException {
    private static final String message = "해당 리뷰를 찾을 수 없습니다.";

    public NotFoundReviewException() {
        super(message);
    }
}
