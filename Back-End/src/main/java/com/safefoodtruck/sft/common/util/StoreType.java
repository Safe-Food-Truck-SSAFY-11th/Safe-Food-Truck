package com.safefoodtruck.sft.common.util;

import java.util.HashMap;
import java.util.Map;

public class StoreType {

    private StoreType() {

    }

    private static final Map<String, String> storeMap = new HashMap<>();

    static {
        storeMap.put("snackBar", "분식");
        storeMap.put("chicken", "치킨");
        storeMap.put("stick", "꼬치");
        storeMap.put("iceCream", "아이스크림");
        storeMap.put("hotteok", "호떡");
        storeMap.put("takoyaki", "타꼬야끼");
        storeMap.put("fishBread", "붕어빵");
        storeMap.put("beverage", "음료");
        storeMap.put("crepe", "크레페");
        storeMap.put("cupbap", "컵밥");
        storeMap.put("steak", "스테이크");
        storeMap.put("pizza", "피자");
    }

    public static String parseKorean(String englishMenuName) {
        if (!storeMap.containsKey(englishMenuName)) {
            return "이 메뉴는 등록되지 않았습니다.";
        }
        return storeMap.get(englishMenuName);
    }
}
