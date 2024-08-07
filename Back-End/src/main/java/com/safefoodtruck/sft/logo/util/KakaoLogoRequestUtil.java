package com.safefoodtruck.sft.logo.util;

import java.util.HashMap;
import java.util.Map;
import lombok.Data;

@Data
public class KakaoLogoRequestUtil {
    private static final String version = "v2.1";
    private static String prompt;
    private static final Integer height = 1024;
    private static final Integer width = 1024;

    private KakaoLogoRequestUtil() {}

    public static Map<String, Object> makeHttpBody(String prompt) {
        Map<String, Object> httpBody = new HashMap<>();
        httpBody.put("version", version);
        httpBody.put("prompt", prompt);
        httpBody.put("height", height);
        httpBody.put("width", width);
        return httpBody;
    }
}
