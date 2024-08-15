package com.safefoodtruck.sft.order.exception;

public class OrderNotFoundException extends RuntimeException{
	public OrderNotFoundException() {
		super(OrderErrorMessage.ORDER_NOT_FOUND);

	}
}
