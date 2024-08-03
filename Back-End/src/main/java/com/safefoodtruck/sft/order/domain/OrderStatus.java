package com.safefoodtruck.sft.order.domain;

public enum OrderStatus {
	PENDING("pending"),
	ACCEPTED("accepted"),
	REJECTED("rejected"),
	PREPARING("preparing"),
	COMPLETED("completed");

	private final String getName;

	OrderStatus(final String getName) {
		this.getName = getName;
	}

	public String get() {
		return getName;
	}
}
