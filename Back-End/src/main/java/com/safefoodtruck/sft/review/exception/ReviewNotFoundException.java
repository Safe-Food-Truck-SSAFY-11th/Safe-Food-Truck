package com.safefoodtruck.sft.review.exception;

public class ReviewNotFoundException extends RuntimeException {
    public ReviewNotFoundException() {
        super(ReviewErrorMessage.REVIEW_NOT_FOUND);
    }

}
