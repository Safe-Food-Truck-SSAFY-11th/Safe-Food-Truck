package com.safefoodtruck.sft.member.repository;

public interface MemberRepositoryCustom {
	boolean existsByEmail(String email);
	boolean existsByNickname(String nickname);
	boolean existsByPhoneNumber(String phoneNumber);
	boolean existsByBusinessNumber(String businessNumber);
}
