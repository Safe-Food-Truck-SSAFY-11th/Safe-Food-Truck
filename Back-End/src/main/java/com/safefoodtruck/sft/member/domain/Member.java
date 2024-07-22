package com.safefoodtruck.sft.member.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicInsert;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "member")
@DynamicInsert
@AllArgsConstructor
@NoArgsConstructor
public class Member {

    @Id
    @NotNull
    @Column(name = "email")
    private String email;

    @NotNull
    @Column(name = "password")
    String password;

    @NotNull
    @Column(name = "name", length = 50)
    String name;

    @NotNull
    @Column(name = "nickname", length = 50)
    String nickname;

    @NotNull
    @Column(name = "gender")
    int gender;

    @NotNull
    @Column(name = "birth", columnDefinition = "DATE")
    LocalDate birth;

    @NotNull
    @Column(name = "phone_number", length = 50)
    String phoneNumber;

    @Column(name = "business_number", length = 100)
    @ColumnDefault("'not ceo'")
    String businessNumber;

    @Column(name = "role", length = 20)
    @ColumnDefault("'customer'")
    String role;

    @Column(name = "reg_date", columnDefinition = "TIMESTAMP")
    LocalDateTime regDate;

    @Column(name = "is_resign")
    @ColumnDefault("0")
    int isResign;
}
