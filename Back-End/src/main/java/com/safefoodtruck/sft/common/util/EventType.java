package com.safefoodtruck.sft.common.util;

public enum EventType {

    FAVORITE("favorite"),
    ACCEPT("accept"),
    REJECT("reject"),
    COMPLETE("complete");

    private final String eventType;

    EventType(String eventType) {
        this.eventType = eventType;
    }

    public String getEventType() {
        return this.eventType;
    }
}
