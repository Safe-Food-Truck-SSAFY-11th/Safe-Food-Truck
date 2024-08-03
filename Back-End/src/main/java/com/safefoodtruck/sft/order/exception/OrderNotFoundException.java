package com.safefoodtruck.sft.order.exception;

import com.safefoodtruck.sft.menu.exception.MenuErrorMessage;

public class OrderNotFoundException extends RuntimeException{
	public OrderNotFoundException() {
		super(MenuErrorMessage.MENU_NOT_FOUND);

	}
}
