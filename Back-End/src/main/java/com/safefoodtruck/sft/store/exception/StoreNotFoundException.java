package com.safefoodtruck.sft.store.exception;

public class StoreNotFoundException extends RuntimeException {

    public StoreNotFoundException() {
        super(StoreErrorMessage.STORE_NOT_FOUND);
    }
}
