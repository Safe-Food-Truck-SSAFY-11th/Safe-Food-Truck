package com.safefoodtruck.sft.store.exception;

public class NullListException extends RuntimeException {

    public NullListException() {
        super(StoreErrorMessage.NULL_LIST);
    }
}
