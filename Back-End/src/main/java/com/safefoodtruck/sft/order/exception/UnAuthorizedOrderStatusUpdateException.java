package com.safefoodtruck.sft.order.exception;

public class UnAuthorizedOrderStatusUpdateException extends RuntimeException{

    public UnAuthorizedOrderStatusUpdateException(){
        super(OrderErrorMessage.UNAUTHORIZED_ORDER_STATUS_UPDATE);
    }
}
