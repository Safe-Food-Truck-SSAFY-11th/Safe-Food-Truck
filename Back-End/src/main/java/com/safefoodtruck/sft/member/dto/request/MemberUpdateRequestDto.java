package com.safefoodtruck.sft.member.dto.request;

import com.safefoodtruck.sft.member.dto.MemberImageDto;
import lombok.Data;

@Data
public class MemberUpdateRequestDto {
    private String email;
    private String nickname;
    private String phoneNumber;
    private String password;
    private MemberImageDto memberImage;
}
