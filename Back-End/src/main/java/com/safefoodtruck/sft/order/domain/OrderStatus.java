package com.safefoodtruck.sft.order.domain;

public enum OrderStatus {
	PENDING("pending"),
	ACCEPTED("accepted"),
	REJECTED("rejected"),
	PREPARING("preparing"),
	COMPLETED("completed");

	private final String status;

	OrderStatus(final String status) {
		this.status = status;
	}

	public String get() {
		return status;
	}
}
