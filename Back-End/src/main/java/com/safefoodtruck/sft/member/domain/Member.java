package com.safefoodtruck.sft.member.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "MEMBER")
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor
public class Member {

    @Id
    @Column(name = "member_email")
    private String email;
    String password;
    String name;
    String phoneNumber;
}
