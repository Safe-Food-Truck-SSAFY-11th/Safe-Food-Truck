package com.safefoodtruck.sft.review.exception;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class ReviewErrorMessage {

    public static final String REVIEW_NOT_FOUND = "해당 리뷰는 존재하지 않습니다.";
}
