package com.safefoodtruck.sft.menu.exception;

public class MenuNotFoundException extends RuntimeException {
    public MenuNotFoundException() {
        super(MenuErrorMessage.MENU_NOT_FOUND);
    }

}
