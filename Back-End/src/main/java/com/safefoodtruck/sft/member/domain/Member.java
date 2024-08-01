package com.safefoodtruck.sft.member.domain;

import com.safefoodtruck.sft.member.dto.MemberSignUpRequestDto;
import com.safefoodtruck.sft.member.dto.MemberUpdateRequestDto;
import com.safefoodtruck.sft.notification.domain.Notification;
import com.safefoodtruck.sft.survey.domain.Survey;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import java.time.LocalDate;
import java.time.LocalDateTime;
import org.hibernate.annotations.DynamicUpdate;

@Entity
@Table(name = "member")
@DynamicInsert
@DynamicUpdate
@NoArgsConstructor(access = AccessLevel.PROTECTED)
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
    private Integer gender;

    @NotNull
    @Column(name = "birth", columnDefinition = "DATE")
    private LocalDate birth;

    @NotNull
    @Column(name = "phone_number", length = 50)
    private String phoneNumber;

    @Column(name = "business_number", length = 100)
    @ColumnDefault("'not owner'")
    private String businessNumber;

    @Column(name = "role", length = 20)
    @ColumnDefault("'customer'")
    private String role;

    @Column(name = "vip_expired_date", columnDefinition = "TIMESTAMP")
    private LocalDateTime vipExpiredDate;

    @Column(name = "reg_date", columnDefinition = "TIMESTAMP")
    private LocalDateTime regDate;

    @Column(name = "is_resign")
    @ColumnDefault("0")
    private Integer isResign;

    @OneToMany(mappedBy = "member")
    private List<Notification> notificationList = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Survey> surveyList = new ArrayList<>();

    public void updateMember(MemberUpdateRequestDto memberUpdateRequestDto) {
        this.nickname = memberUpdateRequestDto.getNickname();
        this.phoneNumber = memberUpdateRequestDto.getPhoneNumber();
        this.password = memberUpdateRequestDto.getPassword();
    }

    public void resign() {
        this.isResign = 1;
    }

    public void joinVip(String vipName) {
        this.role = vipName;
        this.vipExpiredDate = LocalDateTime.now().plusDays(30);
    }

    public void deactivateVip(String role) {
        this.role = role;
        this.vipExpiredDate = null;
    }

    public void extendVip() {
        this.vipExpiredDate = this.vipExpiredDate.plusDays(30);
    }

    public void updatePassword(String randomPassword) {
        this.password = randomPassword;
    }

    @Builder(builderMethodName = "signupBuilder")
    public Member(MemberSignUpRequestDto memberSignUpRequestDto) {
        this.email = memberSignUpRequestDto.getEmail();
        this.password = memberSignUpRequestDto.getPassword();
        this.name = memberSignUpRequestDto.getName();
        this.nickname = memberSignUpRequestDto.getNickname();
        this.gender = memberSignUpRequestDto.getGender();
        this.birth = memberSignUpRequestDto.getBirth();
        this.phoneNumber = memberSignUpRequestDto.getPhoneNumber();
        this.businessNumber = memberSignUpRequestDto.getBusinessNumber();
        this.role = memberSignUpRequestDto.getBusinessNumber() == null ? "customer" : "owner";
        this.regDate = LocalDateTime.now();
        this.isResign = 0;
    }
}
