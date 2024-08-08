package com.safefoodtruck.sft.order.exception;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class OrderErrorMessage {

	public static final String ORDER_NOT_FOUND = "주문이 존재하지 않습니다.";
	public static final String ALREADY_PROCESSED_ORDER = "이미 처리된 주문입니다.";
	public static final String ALREADY_COMPLETED_ORDER = "이미 완성된 주문입니다.";
	public static final String UNAUTHORIZED_ORDER_STATUS_UPDATE = "내 주문이 아닌 주문의 상태를 수정할 수 없습니다.";
	public static final String NOT_PREPARED_ORDER = "아직 조리 준비 전 메뉴입니다.";
}
