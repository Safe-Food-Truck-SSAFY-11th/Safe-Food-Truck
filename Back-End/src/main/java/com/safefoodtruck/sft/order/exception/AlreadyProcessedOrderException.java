package com.safefoodtruck.sft.order.exception;

import static com.safefoodtruck.sft.order.exception.OrderErrorMessage.*;

public class AlreadyProcessedOrderException extends RuntimeException{
	public AlreadyProcessedOrderException() {
		super(ALREADY_PROCESSED_ORDER);
	}
}
