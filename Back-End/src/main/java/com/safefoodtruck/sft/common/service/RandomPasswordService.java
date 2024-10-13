package com.safefoodtruck.sft.common.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class RandomPasswordService {

    private static final String[] strArray = {
        "A", "B", "C", "D", "E", "F","G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R",
        "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j",
        "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
        "!", "@", "*", "!", "@", "*", "!", "@", "*"
    };
    private static final int strLength = strArray.length;

    public String generateRandomPassword() {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 40; i++) {
            Math.random();
            sb.append(strArray[(int)(Math.random() * strLength)]);
        }
        log.info("Generating random password = " + sb);
        return sb.toString();
    }
}
