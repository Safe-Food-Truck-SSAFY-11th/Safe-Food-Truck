package com.safefoodtruck.sft.member.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class MemberSignUpRequestDto {
    private String email;
    String password;
    String name;
    String nickname;
    int gender;
    LocalDate birth;
    String phoneNumber;
    String businessNumber;
    String role;
}
