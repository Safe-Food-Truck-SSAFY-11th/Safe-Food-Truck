package com.safefoodtruck.sft.member.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "member")
@DynamicInsert
@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString
public class Member {

    @Id
    @NotNull
    @Column(name = "email")
    private String email;

    @NotNull
    @Column(name = "password")
    private String password;

    @NotNull
    @Column(name = "name", length = 50)
    private String name;

    @NotNull
    @Column(name = "nickname", length = 50)
    private String nickname;

    @NotNull
    @Column(name = "gender")
    private int gender;

    @NotNull
    @Column(name = "birth", columnDefinition = "DATE")
    private LocalDate birth;

    @NotNull
    @Column(name = "phone_number", length = 50)
    private String phoneNumber;

    @Column(name = "business_number", length = 100)
    @ColumnDefault("'not ceo'")
    private String businessNumber;

    @Column(name = "role", length = 20)
    @ColumnDefault("'customer'")
    private String role;

    @Column(name = "reg_date", columnDefinition = "TIMESTAMP")
    private LocalDateTime regDate;

    @Column(name = "is_resign")
    @ColumnDefault("0")
    private int isResign;
}
