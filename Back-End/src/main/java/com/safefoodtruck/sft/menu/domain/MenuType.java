package com.safefoodtruck.sft.menu.domain;

import java.util.Arrays;

public enum MenuType {
    // 음료 (잔 단위)
    COFFEE("커피", "잔"),
    AMERICANO("아메리카노", "잔"),
    LATTE("라떼", "잔"),
    CAPPUCCINO("카푸치노", "잔"),
    MOCHA("모카", "잔"),
    ESPRESSO("에스프레소", "잔"),
    MACCHIATO("마키아토", "잔"),
    FLAT_WHITE("플랫화이트", "잔"),
    AFFOGATO("아포가토", "잔"),
    TEA("차", "잔"),
    ICED_TEA("아이스티", "잔"),
    BLACK_TEA("홍차", "잔"),
    GREEN_TEA("녹차", "잔"),
    HERBAL_TEA("허브차", "잔"),
    CHAMOMILE("캐모마일", "잔"),
    MATCHA("말차", "잔"),
    LEMONADE("레모네이드", "잔"),
    SMOOTHIE("스무디", "잔"),
    FRAPPUCCINO("프라푸치노", "잔"),
    MILKSHAKE("밀크쉐이크", "잔"),
    JUICE("주스", "잔"),
    SODA("소다", "잔"),
    HOT_CHOCOLATE("핫초콜릿", "잔"),
    MILK("우유", "잔"),
    SOYMILK("두유", "잔"),

    // 디저트 (개 단위)
    CAKE("케이크", "개"),
    MUFFIN("머핀", "개"),
    COOKIE("쿠키", "개"),
    BROWNIE("브라우니", "개"),
    CROISSANT("크루아상", "개"),
    DONUT("도넛", "개"),
    SCONES("스콘", "개"),
    MACARON("마카롱", "개"),
    PIE("파이", "개"),
    TART("타르트", "개"),
    PASTRY("페이스트리", "개"),

    // 식사 (그릇/판 단위)
    PIZZA("피자", "판"),
    PASTA("파스타", "그릇"),
    SPAGHETTI("스파게티", "그릇"),
    LASAGNA("라자냐", "그릇"),
    NOODLES("면", "그릇"),
    RAMEN("라면", "그릇"),
    UDON("우동", "그릇"),
    JJAJANG("짜장면", "그릇"),
    JJAMPPONG("짬뽕", "그릇"),
    RISOTTO("리조또", "그릇"),
    SOUP("수프", "그릇"),
    SANDWICH("샌드위치", "개"),
    BAGEL("베이글", "개"),
    SALAD("샐러드", "그릇"),
    BURGER("버거", "개"),

    // 기타 (개 단위)
    PANCAKE("팬케이크", "개"),
    WAFFLE("와플", "개"),
    ICE_CREAM("아이스크림", "개"),
    TOAST("토스트", "개"),
    CREPE("크레페", "개"),

    // 분식 (개/그릇/판 단위)
    TTEOKBOKKI("떡볶이", "그릇"),
    SOONDDEOK("순대", "개"),
    GIMBAP("김밥", "줄"),
    RAMYEON("라면", "그릇"),
    JJAJANG_BAP("짜장밥", "그릇"),
    DDEOKGALBI("떡갈비", "개"),
    FRIED_DUMPLING("군만두", "개"),
    TWIGIM("튀김", "개"),
    HODDUK("호떡", "개"),
    BUNGEOPPANG("붕어빵", "개"),
    ODAENG("오뎅", "개"),
    TOPOKKI("떡꼬치", "개"),
    SOONDUBU("순두부찌개", "그릇"),
    JOKBAL("족발", "판"),
    BOSSAM("보쌈", "판"),
    CHICKEN("치킨", "마리"),
    FRIED_CHICKEN("후라이드치킨", "마리"),
    YANGNYEOM_CHICKEN("양념치킨", "마리"),
    JUMEOKBAP("주먹밥", "개"),
    MANDU("만두", "개"),

    // 치킨 종류 (마리 단위)
    GARLIC_CHICKEN("갈릭치킨", "마리"),
    SPICY_CHICKEN("매운치킨", "마리"),
    HONEY_CHICKEN("허니치킨", "마리"),
    SOY_SAUCE_CHICKEN("간장치킨", "마리"),
    SNOW_CHICKEN("눈꽃치킨", "마리"),
    CHEESE_CHICKEN("치즈치킨", "마리"),
    CRISPY_CHICKEN("크리스피치킨", "마리"),
    BBQ_CHICKEN("BBQ치킨", "마리"),
    SWEET_CHICKEN("단짠치킨", "마리"),
    HALF_AND_HALF_CHICKEN("반반치킨", "마리"),
    HOT_CHICKEN("핫치킨", "마리"),

    // 족발 및 보쌈 종류 (판 단위)
    ORIGINAL_JOKBAL("오리지널족발", "판"),
    SPICY_JOKBAL("매운족발", "판"),
    HONEY_JOKBAL("허니족발", "판"),
    GARLIC_JOKBAL("갈릭족발", "판"),
    BONELESS_JOKBAL("뼈없는족발", "판"),
    ORIENTAL_JOKBAL("양념족발", "판"),
    SMOKED_JOKBAL("훈제족발", "판"),
    MINI_JOKBAL("미니족발", "판"),
    SSAM_JOKBAL("쌈족발", "판"),

    ORIGINAL_BOSSAM("오리지널보쌈", "판"),
    SPICY_BOSSAM("매운보쌈", "판"),
    GARLIC_BOSSAM("갈릭보쌈", "판"),
    BOSSAM_WITH_SAUCE("양념보쌈", "판"),
    SMOKED_BOSSAM("훈제보쌈", "판"),
    BOILED_BOSSAM("수육보쌈", "판"),

    DEFAULT("", "개");

    private final String menuName;
    private final String unit;

    MenuType(String menuName, String unit) {
        this.menuName = menuName;
        this.unit = unit;
    }

    public String getMenuName() {
        return menuName;
    }

    public String getUnit() {
        return unit;
    }

    public static String getUnitByMenuName(String menuName) {
        return Arrays.stream(MenuType.values())
            .filter(menuType -> menuName.contains(menuType.getMenuName()))
            .findFirst()
            .orElse(DEFAULT)
            .getUnit();
    }
}

