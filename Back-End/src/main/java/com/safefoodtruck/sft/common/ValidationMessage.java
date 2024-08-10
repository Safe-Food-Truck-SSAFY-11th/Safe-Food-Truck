package com.safefoodtruck.sft.common;

public enum ValidationMessage {
	POSSIBLE("Possible"),
	DUPLICATE("Duplicate");

	private final String message;

	ValidationMessage(final String message) {
		this.message = message;
	}

	public String get() {
		return message;
	}

}
