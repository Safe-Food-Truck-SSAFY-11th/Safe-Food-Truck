package com.safefoodtruck.sft.openvidu.service;

import java.util.Map;

public interface OpenviduService {
    String initSession(Map<String, Object> params);
    String connectSession(String sessionId, Map<String, Object> params);
    void closeSession(String sessionId);
}
