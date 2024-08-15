package com.safefoodtruck.sft.store.exception;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class StoreErrorMessage {

    public static final String STORE_NOT_FOUND = "해당 점포는 존재하지 않습니다.";
    public static final String STORE_IMAGE_NOT_FOUND = "해당하는 점포의 이미지는 존재하지 않습니다.";
    public static final String NULL_LIST = "접속자 이메일이 비어있습니다.";
}
