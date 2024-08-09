package com.safefoodtruck.sft.store.dto.request;

import java.util.Set;

public record StoreNoticeRegistRequestDto(String notice, Set<String> connectedEmailList) {
}
