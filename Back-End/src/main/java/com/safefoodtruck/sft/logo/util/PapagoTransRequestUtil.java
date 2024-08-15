package com.safefoodtruck.sft.logo.util;

import java.util.HashMap;
import java.util.Map;
import lombok.Data;

@Data
public class PapagoTransRequestUtil {
    private static final String version = "v2.1";
    private static final String source = "auto";
    private static final String target = "en";
    private static String text;

    private PapagoTransRequestUtil() {}

    public static Map<String, Object> makeHttpBody(String text) {
        Map<String, Object> httpBody = new HashMap<>();
        httpBody.put("source", source);
        httpBody.put("target", target);
        httpBody.put("text", text);
        return httpBody;
    }
}
