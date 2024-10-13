package com.safefoodtruck.sft.order.exception;

import static com.safefoodtruck.sft.order.exception.OrderErrorMessage.*;

public class AlreadyCompletedOrderException extends RuntimeException{
	public AlreadyCompletedOrderException() {
		super(ALREADY_COMPLETED_ORDER);
	}
}
