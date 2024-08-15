package com.safefoodtruck.sft.order.exception;

public class OrderNotPreparingException extends RuntimeException{

    public OrderNotPreparingException(){
        super(OrderErrorMessage.NOT_PREPARED_ORDER);
    }
}
