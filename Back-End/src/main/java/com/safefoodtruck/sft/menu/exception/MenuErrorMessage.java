package com.safefoodtruck.sft.menu.exception;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class MenuErrorMessage {

    public static final String MENU_NOT_FOUND = "해당 메뉴는 존재하지 않습니다.";
}
