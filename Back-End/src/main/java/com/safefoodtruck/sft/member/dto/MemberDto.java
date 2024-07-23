package com.safefoodtruck.sft.member.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.Data;

@Data
public class MemberDto {
    private String email;
    private String password;
    private String name;
    private String nickname;
    private int gender;
    private LocalDate birth;
    private String phoneNumber;
    private String businessNumber;
    private String role;
    private LocalDateTime regDate;
    private int isResign;
}
