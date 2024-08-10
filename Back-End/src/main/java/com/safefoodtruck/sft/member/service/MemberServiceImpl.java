package com.safefoodtruck.sft.member.service;

import java.time.LocalDate;

import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.safefoodtruck.sft.common.service.EmailService;
import com.safefoodtruck.sft.common.service.RandomPasswordService;
import com.safefoodtruck.sft.member.domain.Member;
import com.safefoodtruck.sft.member.domain.MemberImage;
import com.safefoodtruck.sft.member.dto.MemberDto;
import com.safefoodtruck.sft.member.dto.MemberImageDto;
import com.safefoodtruck.sft.member.dto.request.MemberLoginRequestDto;
import com.safefoodtruck.sft.member.dto.request.MemberSignUpRequestDto;
import com.safefoodtruck.sft.member.dto.request.MemberUpdateRequestDto;
import com.safefoodtruck.sft.member.dto.response.MemberSelectResponseDto;
import com.safefoodtruck.sft.member.exception.MemberDuplicateException;
import com.safefoodtruck.sft.member.exception.NotFoundMemberException;
import com.safefoodtruck.sft.member.exception.ResignedMemberException;
import com.safefoodtruck.sft.member.repository.MemberImageRepository;
import com.safefoodtruck.sft.member.repository.MemberRepository;
import com.safefoodtruck.sft.security.util.JwtUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

	private final JwtUtil jwtUtil;
	private final MemberRepository memberRepository;
	private final PasswordEncoder passwordEncoder;
	private final ModelMapper mapper;
	private final EmailService emailService;
	private final RandomPasswordService randomPasswordService;
	private final MemberImageRepository memberImageRepository;

	@Transactional
	@Override
	public String signUp(MemberSignUpRequestDto signUpMemberDto, String signUpMethod) {
		if (signUpMethod.equals("common")) {
			Member memTmp = memberRepository.findByEmail(signUpMemberDto.getEmail())
				.orElseThrow(NotFoundMemberException::new);
			if (memTmp != null) {
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

		Member savedMember = memberRepository.save(Member.signupBuilder()
			.memberSignUpRequestDto(signUpMemberDto)
			.build()
		);

		MemberImage memberImage = MemberImage.builder()
			.member(savedMember)
			.savedUrl(signUpMemberDto.getMemberImage().getSavedUrl())
			.savedUrl(signUpMemberDto.getMemberImage().getSavedPath())
			.build();

		memberImageRepository.save(memberImage);

		MemberDto memberDto = mapper.map(savedMember, MemberDto.class);
		return jwtUtil.createAccessToken(memberDto);
	}

	@Override
	public String login(MemberLoginRequestDto memberLoginRequestDto) {
		String email = memberLoginRequestDto.getEmail();
		String password = memberLoginRequestDto.getPassword();

		Member member = memberRepository.findByEmail(email)
			.orElseThrow(() -> new UsernameNotFoundException("아이디가 존재하지 않습니다."));

		if (member.getIsResign() == 1) {
			throw new ResignedMemberException();
		}

		if (!passwordEncoder.matches(password, member.getPassword())) {
			throw new BadCredentialsException("비밀번호가 일치하지 않습니다.");
		}

		MemberDto memberDto = mapper.map(member, MemberDto.class);
		return jwtUtil.createAccessToken(memberDto);
	}

	@Override
	public MemberSelectResponseDto selectMember(String email) {
		Member member = memberRepository.findByEmail(email)
			.orElseThrow(NotFoundMemberException::new);

		MemberImage memberImage = memberImageRepository.findByMember(member);
		MemberImageDto memberImageDto = mapper.map(memberImage, MemberImageDto.class);

		MemberSelectResponseDto memberSelectResponseDto = mapper.map(member,
			MemberSelectResponseDto.class);
		memberSelectResponseDto.setMemberImage(memberImageDto);
		return memberSelectResponseDto;
	}

	@Override
	public String checkDuplicateEmail(String email) {
		Member member = memberRepository.findByEmail(email)
			.orElseThrow(NotFoundMemberException::new);
		if (member == null) {
			return "Possible";
		}
		return "Duplicate";
	}

	@Override
	public String checkDuplicateNickname(String nickname) {
		Member member = memberRepository.findByNickname(nickname)
			.orElseThrow(NotFoundMemberException::new);
		if (member == null) {
			return "Possible";
		}
		return "Duplicate";
	}

	@Override
	public void updateMember(MemberUpdateRequestDto memberUpdateRequestDto) {
		Member member = memberRepository.findByEmail(memberUpdateRequestDto.getEmail())
			.orElseThrow(NotFoundMemberException::new);
		memberUpdateRequestDto.setPassword(
			passwordEncoder.encode(memberUpdateRequestDto.getPassword()));
		member.updateMember(memberUpdateRequestDto);

		MemberImage memberImage = memberImageRepository.findByMember(member);
		memberImage.updateMemberImage(member, memberUpdateRequestDto.getMemberImage());
		memberRepository.save(member);
		memberImageRepository.save(memberImage);
	}

	@Override
	public void updateIsResign(String email) {
		Member member = memberRepository.findByEmail(email)
			.orElseThrow(NotFoundMemberException::new);
		member.resign();
		memberRepository.save(member);
	}

	@Override
	public void joinVip(String email) {
		Member member = memberRepository.findByEmail(email)
			.orElseThrow(NotFoundMemberException::new);

		if (member.getRole().equals("customer")) {
			member.joinVip("vip_customer");
		} else if (member.getRole().equals("owner")) {
			member.joinVip("vip_owner");
		}
		memberRepository.save(member);
	}

	@Override
	public void deactivateVip(String email) {
		Member member = memberRepository.findByEmail(email)
			.orElseThrow(NotFoundMemberException::new);

		if (member.getRole().equals("vip_customer")) {
			member.deactivateVip("customer");
		} else if (member.getRole().equals("vip_owner")) {
			member.deactivateVip("owner");
		}
		memberRepository.save(member);
	}

	@Override
	public void extendVip(String email) {
		Member member = memberRepository.findByEmail(email)
			.orElseThrow(NotFoundMemberException::new);
		member.extendVip();
		memberRepository.save(member);
	}

	@Override
	public String searchEmail(String name, LocalDate birth, String phoneNumber) {
		Member member = memberRepository.findByNameAndBirthAndPhoneNumber(name, birth, phoneNumber)
			.orElseThrow(NotFoundMemberException::new);

		if (member == null) {
			throw new NotFoundMemberException();
		}
		return member.getEmail();
	}

	@Override
	public void searchPassword(String email, String name, LocalDate birth, String phoneNumber) {
		Member member = memberRepository.findByEmailAndNameAndBirthAndPhoneNumber(email, name,
			birth, phoneNumber).orElseThrow(NotFoundMemberException::new);

		if (member == null) {
			throw new NotFoundMemberException();
		}
		String randomPassword = randomPasswordService.generateRandomPassword();
		member.updatePassword(passwordEncoder.encode(randomPassword));
		memberRepository.save(member);

		emailService.sendEmailPassword(email, name, randomPassword);
	}
}
