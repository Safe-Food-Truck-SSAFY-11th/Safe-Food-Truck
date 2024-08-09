package com.safefoodtruck.sft.logo.util;

import java.util.HashMap;
import java.util.Map;
import lombok.Data;

@Data
public class KakaoTransRequestUtil {
    private static final String version = "v2.1";
    private static final String source = "auto";
    private static final String target = "en";
    private static String text;

    private KakaoTransRequestUtil() {}

    public static Map<String, Object> makeHttpBody(String text) {
        Map<String, Object> httpBody = new HashMap<>();
        httpBody.put("source", source);
        httpBody.put("target", target);
        httpBody.put("text", text);
        return httpBody;
    }
}
