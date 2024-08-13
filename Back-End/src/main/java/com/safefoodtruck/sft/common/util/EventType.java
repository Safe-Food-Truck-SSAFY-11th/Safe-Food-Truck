package com.safefoodtruck.sft.common.util;

public enum EventType {

    CUSTOMER_ORDER("customerOrder"),
    OPEN("storeOpen"),
    CREATE_ORDER("createOrder"),
    CREATE_REVIEW("createReview"),
    LIVE_START("liveStart"),
    LIVE_END("livedEnd");

    private final String eventType;

    EventType(String eventType) {
        this.eventType = eventType;
    }

    public String getEventType() {
        return this.eventType;
    }
}
