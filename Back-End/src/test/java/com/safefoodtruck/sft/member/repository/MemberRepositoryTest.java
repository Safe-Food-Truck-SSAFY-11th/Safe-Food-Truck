package com.safefoodtruck.sft.member.repository;


import com.safefoodtruck.sft.member.domain.Member;
import com.safefoodtruck.sft.member.dto.MemberSignUpRequestDto;
import java.time.LocalDate;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

@DataJpaTest
class MemberRepositoryTest {

    private static final String EMAIL = "TEST1234@naver.com";
    private static final String PASSWORD = "1234";
    private static final String NAME = "장준석";
    private static final String NICKNAME = "준석nim";
    private static final LocalDate BIRTH = LocalDate.of(1999, 9, 5 );
    private static final Integer GENDER = 0;
    private static final String PHONE_NUMBER = "010-1234-5678";
    private static final String BUSINESS_NUMBER = "123-456789-1450";
    private static final String CUSTOMER_ROLE = "customer";
    private static final String owner_ROLE = "owner";
    private static final Integer IS_RESIGN = 0; //탈퇴안함

    @Autowired
    private MemberRepository memberRepository;

    @Test
    @DisplayName("손님으로 회원가입을 한다.")
    void findByEmailCustomer() {
        //given
        MemberSignUpRequestDto memberSignUpRequestDto = MemberSignUpRequestDto.builder()
            .email(EMAIL)
            .password(PASSWORD)
            .name(NAME)
            .nickname(NICKNAME)
            .birth(BIRTH)
            .gender(GENDER)
            .phoneNumber(PHONE_NUMBER)
            .build();

        //when
        Member member = Member.signupBuilder()
            .memberSignUpRequestDto(memberSignUpRequestDto)
            .build();
        Member savedMember = memberRepository.save(member);
        Member findMember = memberRepository.findByEmail(savedMember.getEmail());

        //then
        Assertions.assertSame(savedMember, findMember);
        Assertions.assertEquals(savedMember.getEmail(), findMember.getEmail());
        Assertions.assertEquals(savedMember.getPassword(), findMember.getPassword());
        Assertions.assertEquals(savedMember.getName(), findMember.getName());
        Assertions.assertEquals(savedMember.getNickname(), findMember.getNickname());
        Assertions.assertEquals(savedMember.getBirth(), findMember.getBirth());
        Assertions.assertEquals(savedMember.getGender(), findMember.getGender());
        Assertions.assertEquals(savedMember.getPhoneNumber(), findMember.getPhoneNumber());
        Assertions.assertEquals(savedMember.getRole(), findMember.getRole());
        Assertions.assertEquals(CUSTOMER_ROLE, findMember.getRole());
        Assertions.assertEquals(savedMember.getRegDate(), findMember.getRegDate());
        Assertions.assertEquals(savedMember.getIsResign(), findMember.getIsResign());
        Assertions.assertEquals(IS_RESIGN, findMember.getIsResign());
    }

    @Test
    @DisplayName("사장님으로 회원가입을 한다.")
    void findByEmailowner() {
        //given
        MemberSignUpRequestDto memberSignUpRequestDto = MemberSignUpRequestDto.builder()
            .email(EMAIL)
            .password(PASSWORD)
            .name(NAME)
            .nickname(NICKNAME)
            .birth(BIRTH)
            .gender(GENDER)
            .phoneNumber(PHONE_NUMBER)
            .businessNumber(BUSINESS_NUMBER)
            .build();

        //when
        Member member = Member.signupBuilder()
            .memberSignUpRequestDto(memberSignUpRequestDto)
            .build();
        Member savedMember = memberRepository.save(member);
        Member findMember = memberRepository.findByEmail(savedMember.getEmail());

        //then
        Assertions.assertSame(savedMember, findMember);
        Assertions.assertEquals(savedMember.getEmail(), findMember.getEmail());
        Assertions.assertEquals(savedMember.getPassword(), findMember.getPassword());
        Assertions.assertEquals(savedMember.getName(), findMember.getName());
        Assertions.assertEquals(savedMember.getNickname(), findMember.getNickname());
        Assertions.assertEquals(savedMember.getBirth(), findMember.getBirth());
        Assertions.assertEquals(savedMember.getGender(), findMember.getGender());
        Assertions.assertEquals(savedMember.getPhoneNumber(), findMember.getPhoneNumber());
        Assertions.assertEquals(savedMember.getRole(), findMember.getRole());
        Assertions.assertEquals(owner_ROLE, findMember.getRole());
        Assertions.assertEquals(savedMember.getRegDate(), findMember.getRegDate());
        Assertions.assertEquals(savedMember.getIsResign(), findMember.getIsResign());
        Assertions.assertEquals(IS_RESIGN, findMember.getIsResign());
    }
}