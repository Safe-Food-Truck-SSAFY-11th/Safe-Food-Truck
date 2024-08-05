package com.safefoodtruck.sft.store.exception;

public class StoreImageNotFoundException extends RuntimeException {

    public StoreImageNotFoundException() {
        super(StoreErrorMessage.STORE_IMAGE_NOT_FOUND);
    }
}
