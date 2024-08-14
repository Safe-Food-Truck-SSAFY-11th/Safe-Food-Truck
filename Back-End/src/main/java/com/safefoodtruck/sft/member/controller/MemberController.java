package com.safefoodtruck.sft.member.controller;

import com.safefoodtruck.sft.member.dto.response.RemainingVipPeriodResponseDto;
import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.safefoodtruck.sft.common.dto.ErrorResponseDto;
import com.safefoodtruck.sft.common.util.MemberInfo;
import com.safefoodtruck.sft.member.dto.request.MemberLoginRequestDto;
import com.safefoodtruck.sft.member.dto.request.MemberSignUpRequestDto;
import com.safefoodtruck.sft.member.dto.request.MemberUpdateRequestDto;
import com.safefoodtruck.sft.member.dto.response.MemberSelectResponseDto;
import com.safefoodtruck.sft.member.exception.MemberDuplicateException;
import com.safefoodtruck.sft.member.exception.NotFoundMemberException;
import com.safefoodtruck.sft.member.exception.ResignedMemberException;
import com.safefoodtruck.sft.member.service.MemberService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;

@RequestMapping("/members")
@RestController
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "회원정보 조회", description = "회원정보 조회시 사용하는 API")
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "회원정보 조회 성공",
            content = @Content(mediaType = "application/json")
        )
    })
    public ResponseEntity<MemberSelectResponseDto> selectMember() {
        String userEmail = MemberInfo.getEmail();
        MemberSelectResponseDto memberSelectResponseDto = memberService.selectMember(userEmail);

        return ResponseEntity.status(HttpStatus.OK).body(memberSelectResponseDto);
    }

    @GetMapping("/duplication-email/{email}")
    @Operation(summary = "이메일 중복확인", description = "회원가입시 이메일 중복체크에 사용하는 API")
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Duplicate: 중복 | Possible: 해당 이메일 사용가능",
            content = @Content(mediaType = "application/json")
        )
    })
    public ResponseEntity<String> isDuplicateEmail(@PathVariable("email") String email) {
        String responseMessage = memberService.checkDuplicateEmail(email);
        return ResponseEntity.status(HttpStatus.OK).body(responseMessage);
    }

    @GetMapping("/duplication-nickname/{nickname}")
    @Operation(summary = "닉네임 중복확인", description = "회원가입시 닉네임 중복체크에 사용하는 API")
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Duplicate: 중복 | Possible: 해당 닉네임 사용가능",
            content = @Content(mediaType = "application/json")
        )
    })
    public ResponseEntity<String> isDuplicateNickname(@PathVariable("nickname") String nickname) {
        String responseMessage = memberService.checkDuplicateNickname(nickname);
        return ResponseEntity.status(HttpStatus.OK).body(responseMessage);
    }

    @GetMapping("/duplication-phone-number/{phone-number}")
    @Operation(summary = "전화번호 중복확인", description = "회원가입시 전화번호 중복체크에 사용하는 API")
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Duplicate: 중복 | Possible: 해당 전화번호 사용가능",
            content = @Content(mediaType = "application/json")
        )
    })
    public ResponseEntity<String> isDuplicatePhoneNumber(@PathVariable("phone-number") String phoneNumber) {
        String responseMessage = memberService.checkDuplicatePhoneNumber(phoneNumber);
        return ResponseEntity.status(HttpStatus.OK).body(responseMessage);
    }

    @GetMapping("/duplication-business-number/{business-number}")
    @Operation(summary = "사업자번호 중복확인", description = "회원가입시 사업자번호 중복체크에 사용하는 API")
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Duplicate: 중복 | Possible: 해당 사업자번호 사용가능",
            content = @Content(mediaType = "application/json")
        )
    })
    public ResponseEntity<String> isDuplicateBusinessNumber(@PathVariable("business-number") String businessNumber) {
        String responseMessage = memberService.checkDuplicateBusinessNumber(businessNumber);
        return ResponseEntity.status(HttpStatus.OK).body(responseMessage);
    }

    @PostMapping("/{method}")
    @Operation(summary = "회원가입", description = "회원가입 할 때 사용하는 API")
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "회원가입에 성공하였습니다!",
            content = @Content(mediaType = "application/json")
        ),
        @ApiResponse(
            responseCode = "500",
            description = "Error Message 로 전달함",
            content = @Content(mediaType = "application/json")
        ),
        @ApiResponse(
            responseCode = "404",
            description = "PathVariable이 잘못됨. (common, kakao, google) 중 하나여야함",
            content = @Content(mediaType = "application/json")
        )
    })
    public ResponseEntity<?> signUp(
        @RequestBody MemberSignUpRequestDto memberSignUpRequestDto,
        @PathVariable("method") String signUpMethod
    ) {
        if (!(signUpMethod.equals("common")
            || signUpMethod.equals("kakao")
            || signUpMethod.equals("google"))) {
            return ResponseEntity.status(HttpStatus.OK).body(new ErrorResponseDto(
                    HttpStatus.NOT_FOUND.value(),
                    "잘못된 URI 입니다.",
                    LocalDateTime.now()
                )
            );
        }

        String accessToken = memberService.signUp(memberSignUpRequestDto, signUpMethod);
        return ResponseEntity.status(HttpStatus.OK).body(accessToken);
    }

    @PostMapping("/login")
    @Operation(summary = "로그인", description = "로그인 할 때 사용하는 API")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200",
            description = "토큰 값 예시)\n"
                + "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiamFuZzIzQG5hdmVyLmNvbSIsInVzZXJfbmlja25hbW"
                + "UiOiLsrYzsi53snbTsi7jsnqUiLCJyb2xlIjoiY2VvIiwiaWF0IjoxNzIxNjk3NDU4LCJleHAiOjE3Mj"
                + "UyOTc0NTh9.qkfDyphrra4cAqlOyIxVjz79mb4D2ECWnkOcGkYTSI8",
            content = @Content(mediaType = "application/json"))
    })
    public ResponseEntity<?> login(@RequestBody MemberLoginRequestDto memberLoginRequestDto) {
        String accessToken = memberService.login(memberLoginRequestDto);
        return ResponseEntity.status(HttpStatus.OK).body(accessToken);
    }

    @PatchMapping("/modify")
    @Operation(summary = "회원정보 수정", description = "회원정보 수정 할 때 사용하는 API")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200",
            description = "손님, 사장님: 프로필 사진, 비밀번호, 닉네임, 전화번호 변경가능",
            content = @Content(mediaType = "application/json"))
    })
    public ResponseEntity<?> updateMember(
        @RequestBody MemberUpdateRequestDto memberUpdateRequestDto) {
        String userEmail = MemberInfo.getEmail();
        memberUpdateRequestDto.setEmail(userEmail);
        memberService.updateMember(memberUpdateRequestDto);
        return ResponseEntity.status(HttpStatus.OK).body("회원정보 수정완료!!");
    }

    @PatchMapping("/deactivate")
    @Operation(summary = "회원탈퇴", description = "회원탈퇴 할 때 사용하는 API")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200",
            description = "is_Resign이 1로 바뀜",
            content = @Content(mediaType = "application/json"))
    })
    public ResponseEntity<?> deactivateMember() {
        String userEmail = MemberInfo.getEmail();
        memberService.updateIsResign(userEmail);
        return ResponseEntity.status(HttpStatus.OK).body("회원탈퇴 완료!!");
    }

    @GetMapping("/vip")
    @Operation(summary = "멤버십 남은기간 조회", description = "멤버십 남은기간 조회시 사용하는 API")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200",
            description = "0000년 00월 00일",
            content = @Content(mediaType = "application/json"))
    })
    @PreAuthorize("hasAnyRole('ROLE_vip_owner')")
    public ResponseEntity<?> getRemainingVipPeriod() {
        String userEmail = MemberInfo.getEmail();
        RemainingVipPeriodResponseDto remainingVipPeriod = memberService.getRemainingVipPeriod(userEmail);
        return ResponseEntity.status(HttpStatus.OK).body(remainingVipPeriod);
    }

    @PostMapping("/vip")
    @Operation(summary = "멤버십 가입", description = "멤버십 가입 시 사용하는 API")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200",
            description = "손님이면 vip_customer, 사장님이면 vip_owner",
            content = @Content(mediaType = "application/json"))
    })
    @PreAuthorize("hasAnyRole('ROLE_customer', 'ROLE_owner')")
    public ResponseEntity<?> joinVip() {
        String userEmail = MemberInfo.getEmail();
        memberService.joinVip(userEmail);
        return ResponseEntity.status(HttpStatus.OK).body("멤버십 가입완료");
    }

    @PatchMapping("/vip/deactivate")
    @Operation(summary = "멤버십 탈퇴", description = "멤버십 탈퇴 시 사용하는 API")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200",
            description = "현재 멤버십이 만료됩니다.",
            content = @Content(mediaType = "application/json"))
    })
    @PreAuthorize("hasAnyRole('ROLE_vip_customer', 'ROLE_vip_owner')")
    public ResponseEntity<?> deactivateVip() {
        String userEmail = MemberInfo.getEmail();
        memberService.deactivateVip(userEmail);
        return ResponseEntity.status(HttpStatus.OK).body("멤버십 탈퇴완료");
    }

    @PatchMapping("/vip")
    @Operation(summary = "멤버십 연장", description = "멤버십 연장 시 사용하는 API")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200",
            description = "현재 멤버십이 30일 연장됩니다.",
            content = @Content(mediaType = "application/json"))
    })
    @PreAuthorize("hasAnyRole('ROLE_vip_customer', 'ROLE_vip_owner')")
    public ResponseEntity<?> extendVip() {
        String userEmail = MemberInfo.getEmail();
        memberService.extendVip(userEmail);
        return ResponseEntity.status(HttpStatus.OK).body("멤버십 연장완료");
    }

    @GetMapping("/email")
    @Operation(summary = "이메일 찾기", description = "이메일 찾기 시 사용하는 API")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200",
            description = "(이름, 생일, 전화번호)로 요청하여 모두 일치할 시 이메일을 알려줍니다.",
            content = @Content(mediaType = "application/json")),
        @ApiResponse(responseCode = "500",
            description = "(이름, 생일, 전화번호)가 모두 일치하는 회원이 존재하지 않습니다.",
            content = @Content(mediaType = "application/json"))
    })
    public ResponseEntity<?> searchEmail(
        @RequestParam String name,
        @RequestParam LocalDate birth,
        @RequestParam String phoneNumber
    ) {
        String searchedEmail = memberService.searchEmail(name, birth, phoneNumber);
        return ResponseEntity.status(HttpStatus.OK).body(searchedEmail);
    }

    @GetMapping("/password")
    @Operation(summary = "비밀번호 찾기", description = "비밀번호 찾기 시 사용하는 API")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200",
            description = "(이메일, 이름, 생일, 전화번호)로 요청하여 모두 일치할 시 임시 비밀번호를 이메일로 전송합니다.",
            content = @Content(mediaType = "application/json")),
        @ApiResponse(responseCode = "500",
            description = "(이메일, 이름, 생일, 전화번호)가 모두 일치하는 회원이 존재하지 않습니다.",
            content = @Content(mediaType = "application/json"))
    })
    public ResponseEntity<?> searchPassword(
        @RequestParam String email,
        @RequestParam String name,
        @RequestParam LocalDate birth,
        @RequestParam String phoneNumber
    ) {
        memberService.searchPassword(email, name, birth, phoneNumber);
        return ResponseEntity.status(HttpStatus.OK).body("임시 비밀번호를 이메일로 전송하였습니다.");
    }

    @ExceptionHandler({MemberDuplicateException.class, NotFoundMemberException.class,
        ResignedMemberException.class})
    public ResponseEntity<?> memberDuplicateException(Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .contentType(MediaType.APPLICATION_JSON)
            .body(new ErrorResponseDto(
                    HttpStatus.INTERNAL_SERVER_ERROR.value(),
                    e.getMessage(),
                    LocalDateTime.now()
                )
            );
    }
}
