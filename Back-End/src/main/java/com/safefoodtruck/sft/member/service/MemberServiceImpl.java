package com.safefoodtruck.sft.member.service;

import static com.safefoodtruck.sft.common.message.ValidationMessage.*;
import static com.safefoodtruck.sft.member.domain.LoginType.*;
import static com.safefoodtruck.sft.member.domain.Membership.*;

import com.safefoodtruck.sft.member.dto.response.RemainingVipPeriodResponseDto;
import java.time.LocalDate;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.BadCredentialsException;
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
	public String signUp(final MemberSignUpRequestDto signUpMemberDto, final String signUpMethod) {
		if (COMMON.get().equals(signUpMethod) && memberRepository.existsByEmail(signUpMemberDto.getEmail())) {
			throw new MemberDuplicateException();
		}

		signUpMemberDto.setPassword(encodePassword(signUpMemberDto.getPassword(), signUpMethod));

		Member savedMember = memberRepository.save(Member.signupBuilder()
			.memberSignUpRequestDto(signUpMemberDto)
			.build()
		);

		saveMemberImage(signUpMemberDto, savedMember);

		return jwtUtil.createAccessToken(mapper.map(savedMember, MemberDto.class));
	}

	@Override
	public String login(final MemberLoginRequestDto memberLoginRequestDto) {
		Member member = findMemberByEmail(memberLoginRequestDto.getEmail());

		validateResignedMember(member);
		validatePassword(memberLoginRequestDto.getPassword(), member.getPassword());

		return jwtUtil.createAccessToken(mapper.map(member, MemberDto.class));
	}

	@Override
	public MemberSelectResponseDto selectMember(final String email) {
		Member member = findMemberByEmail(email);
		MemberImageDto memberImageDto = mapper.map(memberImageRepository.findByMember(member), MemberImageDto.class);

		MemberSelectResponseDto responseDto = mapper.map(member, MemberSelectResponseDto.class);
		responseDto.setMemberImage(memberImageDto);

		return responseDto;
	}

	@Override
	public String checkDuplicateEmail(final String email) {
		return checkDuplicate(memberRepository.existsByEmail(email));
	}

	@Override
	public String checkDuplicateNickname(final String nickname) {
		return checkDuplicate(memberRepository.existsByNickname(nickname));
	}

	@Override
	public String checkDuplicatePhoneNumber(final String phoneNumber) {
		return checkDuplicate(memberRepository.existsByPhoneNumber(phoneNumber));
	}

	@Override
	public String checkDuplicateBusinessNumber(final String businessNumber) {
		return checkDuplicate(memberRepository.existsByBusinessNumber(businessNumber));
	}

	@Override
	public void updateMember(final MemberUpdateRequestDto memberUpdateRequestDto) {
		Member member = findMemberByEmail(memberUpdateRequestDto.getEmail());
		memberUpdateRequestDto.setPassword(passwordEncoder.encode(memberUpdateRequestDto.getPassword()));
		member.updateMember(memberUpdateRequestDto);

		MemberImage memberImage = memberImageRepository.findByMember(member);
		memberImage.updateMemberImage(member, memberUpdateRequestDto.getMemberImage());

		memberRepository.save(member);
		memberImageRepository.save(memberImage);
	}

	@Override
	public void updateIsResign(final String email) {
		Member member = findMemberByEmail(email);
		member.resign();
		memberRepository.save(member);
	}

	@Override
	public void joinVip(final String email) {
		Member member = findMemberByEmail(email);
		member.joinVip(resolveVipRole(member.getRole()));
		memberRepository.save(member);
	}

	@Override
	public void deactivateVip(final String email) {
		Member member = findMemberByEmail(email);
		member.deactivateVip(resolveBaseRole(member.getRole()));
		memberRepository.save(member);
	}

	@Override
	public void extendVip(final String email) {
		Member member = findMemberByEmail(email);
		member.extendVip();
		memberRepository.save(member);
	}

	@Override
	public String searchEmail(final String name, final LocalDate birth, final String phoneNumber) {
		return memberRepository.findEmailByNameAndBirthAndPhoneNumber(name, birth, phoneNumber);
	}

	@Override
	public void searchPassword(final String email, final String name, final LocalDate birth, final String phoneNumber) {
		Member member = memberRepository.findByEmailAndNameAndBirthAndPhoneNumber(email, name, birth, phoneNumber)
			.orElseThrow(NotFoundMemberException::new);

		String randomPassword = randomPasswordService.generateRandomPassword();
		member.updatePassword(passwordEncoder.encode(randomPassword));

		memberRepository.save(member);
		emailService.sendEmailPassword(email, name, randomPassword);
	}

	@Override
	public RemainingVipPeriodResponseDto getRemainingVipPeriod(String email) {
		Member member = findMemberByEmail(email);
		LocalDateTime remainingVipPeriod = member.getVipExpiredDate();

		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy년 MM월 dd일 HH시 mm분");
		String formattedDateTime = remainingVipPeriod.format(formatter);
		return new RemainingVipPeriodResponseDto(formattedDateTime);
	}

	private Member findMemberByEmail(String email) {
		return memberRepository.findByEmail(email).orElseThrow(NotFoundMemberException::new);
	}

	private void validateResignedMember(Member member) {
		if (member.getIsResign() == 1) {
			throw new ResignedMemberException();
		}
	}

	private void validatePassword(String rawPassword, String encodedPassword) {
		if (!passwordEncoder.matches(rawPassword, encodedPassword)) {
			throw new BadCredentialsException("비밀번호가 일치하지 않습니다.");
		}
	}

	private String encodePassword(String password, String signUpMethod) {
		if (COMMON.get().equals(signUpMethod)) {
			return passwordEncoder.encode(password);
		} else if (KAKAO.get().equals(signUpMethod) || GOOGLE.get().equals(signUpMethod)) {
			return signUpMethod;
		}
		return "EMPTY PASSWORD";
	}

	private void saveMemberImage(MemberSignUpRequestDto signUpMemberDto, Member savedMember) {
		MemberImage memberImage = MemberImage.builder()
			.member(savedMember)
			.savedUrl(signUpMemberDto.getMemberImage().getSavedUrl())
			.savedPath(signUpMemberDto.getMemberImage().getSavedPath())
			.build();

		memberImageRepository.save(memberImage);
	}

	private String resolveVipRole(String role) {
		if (CUSTOMER.get().equals(role)) {
			return VIP_CUSTOMER.get();
		}
		if (OWNER.get().equals(role)) {
			return VIP_OWNER.get();
		}
		return role;
	}

	private String resolveBaseRole(String role) {
		if (VIP_CUSTOMER.get().equals(role)) {
			return CUSTOMER.get();
		}
		if (VIP_OWNER.get().equals(role)) {
			return OWNER.get();
		}
		return role;
	}

	private String checkDuplicate(boolean exists) {
		return exists ? DUPLICATE.get() : POSSIBLE.get();
	}
}
