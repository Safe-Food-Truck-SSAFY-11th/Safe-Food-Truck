package com.safefoodtruck.sft.member.service;

import com.safefoodtruck.sft.member.domain.Member;
import com.safefoodtruck.sft.member.dto.MemberDto;
import com.safefoodtruck.sft.member.dto.MemberLoginRequestDto;
import com.safefoodtruck.sft.member.dto.MemberSelectResponseDto;
import com.safefoodtruck.sft.member.dto.MemberSignUpRequestDto;
import com.safefoodtruck.sft.member.dto.MemberUpdateRequestDto;
import com.safefoodtruck.sft.member.exception.MemberDuplicateException;
import com.safefoodtruck.sft.member.repository.MemberRepository;
import com.safefoodtruck.sft.security.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final JwtUtil jwtUtil;
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper mapper;

    @Override
    public String signUp(MemberSignUpRequestDto signUpMemberDto, String signUpMethod) {
        if (signUpMethod.equals("common")) {
            Member memTmp = memberRepository.findByEmail(signUpMemberDto.getEmail());
            if (memTmp!= null) {
                throw new MemberDuplicateException();
            }
        }

        String password = "EMPTY PASSWORD";
        if (signUpMethod.equals("common")) {
            password = passwordEncoder.encode(signUpMemberDto.getPassword());
        } else if (signUpMethod.equals("kakao") || signUpMethod.equals("google")) {
            password = signUpMethod;
        }

        signUpMemberDto.setPassword(password);
        Member member = memberRepository.save(Member.signupBuilder()
            .memberSignUpRequestDto(signUpMemberDto)
            .build()
        );

        MemberDto memberDto = mapper.map(member, MemberDto.class);
        return jwtUtil.createAccessToken(memberDto);
    }

    @Override
    public String login(MemberLoginRequestDto memberLoginRequestDto) {
        String email = memberLoginRequestDto.getEmail();
        String password = memberLoginRequestDto.getPassword();
        Member member = memberRepository.findByEmail(email);
        System.out.println(member);
        if (member == null) {
            throw new UsernameNotFoundException("아이디가 존재하지 않습니다.");
        }

        //암호화된 password를 Decoding한 값과 입력한 password 값이 다르면 null 반환
        if (!passwordEncoder.matches(password, member.getPassword())) {
            throw new BadCredentialsException("비밀번호가 일치하지 않습니다.");
        }

        MemberDto memberDto = mapper.map(member, MemberDto.class);
        String accessToken = jwtUtil.createAccessToken(memberDto);
        return accessToken;
    }

    @Override
    public MemberSelectResponseDto selectMember(String email) {
        Member member = memberRepository.findByEmail(email);
        MemberSelectResponseDto memberSelectResponseDto = mapper.map(member, MemberSelectResponseDto.class);
        return memberSelectResponseDto;
    }

    @Override
    public String checkDuplicateEmail(String email) {
        Member member = memberRepository.findByEmail(email);
        if (member == null) {
            return "Possible";
        }
        return "Duplicate";
    }

    @Override
    public String checkDuplicateNickname(String nickname) {
        Member member = memberRepository.findByNickname(nickname);
        if (member == null) {
            return "Possible";
        }
        return "Duplicate";
    }

    @Override
    public void updateMember(MemberUpdateRequestDto memberUpdateRequestDto) {
        Member member = memberRepository.findByEmail(memberUpdateRequestDto.getEmail());
        memberUpdateRequestDto.setPassword(passwordEncoder.encode(memberUpdateRequestDto.getPassword()));
        member.updateMember(memberUpdateRequestDto);
        memberRepository.save(member);
    }

    @Override
    public void updateIsResign(String email) {
        Member member = memberRepository.findByEmail(email);
        member.resign();
        memberRepository.save(member);
    }

    @Override
    public void joinVip(String email) {
        Member member = memberRepository.findByEmail(email);

        if (member.getRole().equals("customer")) {
            member.joinVip("vip_customer");
        } else if (member.getRole().equals("ceo")) {
            member.joinVip("vip_ceo");
        }
        memberRepository.save(member);
    }

    @Override
    public void deactivateVip(String email) {
        Member member = memberRepository.findByEmail(email);

        if (member.getRole().equals("vip_customer")) {
            member.deactivateVip("customer");
        } else if (member.getRole().equals("vip_ceo")) {
            member.deactivateVip("ceo");
        }
        memberRepository.save(member);
    }

    @Override
    public void extendVip(String email) {
        Member member = memberRepository.findByEmail(email);
        member.extendVip();
        memberRepository.save(member);
    }
}
