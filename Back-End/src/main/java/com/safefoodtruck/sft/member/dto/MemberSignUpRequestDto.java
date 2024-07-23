package com.safefoodtruck.sft.member.dto;

import lombok.Builder;
import lombok.Data;
import java.time.LocalDate;

@Data
@Builder
public class MemberSignUpRequestDto {
    private String email;
    private String password;
    private String name;
    private String nickname;
    private int gender;
    private LocalDate birth;
    private String phoneNumber;
    private String businessNumber;
    private String role;
}
