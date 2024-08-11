package com.safefoodtruck.sft.member.domain;

public enum Membership {
	CUSTOMER("customer"),
	OWNER("owner"),
	VIP_CUSTOMER("vip_customer"),
	VIP_OWNER("vip_owner");

	private final String membership;

	Membership(final String membership) {
		this.membership = membership;
	}

	public String get() {
		return membership;
	}
}
