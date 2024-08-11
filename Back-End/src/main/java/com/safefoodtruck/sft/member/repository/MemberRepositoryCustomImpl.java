package com.safefoodtruck.sft.member.repository;

import static com.safefoodtruck.sft.member.domain.QMember.*;

import org.springframework.stereotype.Repository;

import com.querydsl.core.types.dsl.StringPath;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class MemberRepositoryCustomImpl implements MemberRepositoryCustom {

	private final JPAQueryFactory jpaQueryFactory;

	@Override
	public boolean existsByEmail(final String email) {
		return existsByField(member.email, email);
	}

	@Override
	public boolean existsByNickname(final String nickname) {
		return existsByField(member.nickname, nickname);
	}

	@Override
	public boolean existsByPhoneNumber(final String phoneNumber) {
		return existsByField(member.phoneNumber, phoneNumber);
	}

	@Override
	public boolean existsByBusinessNumber(final String businessNumber) {
		return existsByField(member.businessNumber, businessNumber);
	}

	private boolean existsByField(StringPath field, String value) {
		Integer fetchOne = jpaQueryFactory
			.selectOne().from(member)
			.where(field.eq(value))
			.fetchFirst();

		return fetchOne != null;
	}
}
