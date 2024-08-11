package com.safefoodtruck.sft.member.domain;

public enum LoginType {

	COMMON("common"),
	KAKAO("kakao"),
	GOOGLE("google");

	private final String loginType;

	LoginType(final String loginType) {
		this.loginType = loginType;
	}

	public String get() {
		return loginType;
	}
}
