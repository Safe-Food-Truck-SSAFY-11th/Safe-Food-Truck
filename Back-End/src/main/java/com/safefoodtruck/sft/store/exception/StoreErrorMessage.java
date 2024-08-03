package com.safefoodtruck.sft.store.exception;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class StoreErrorMessage {

    public static final String STORE_NOT_FOUND = "해당 점포는 존재하지 않습니다.";
}
