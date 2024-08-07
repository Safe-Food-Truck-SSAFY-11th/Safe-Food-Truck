package com.safefoodtruck.sft.common.util;

public enum EventType {

    CUSTOMER("customer"),
    OWNER("owner");

    private final String eventType;

    EventType(String eventType) {
        this.eventType = eventType;
    }

    public String getEventType() {
        return this.eventType;
    }
}
