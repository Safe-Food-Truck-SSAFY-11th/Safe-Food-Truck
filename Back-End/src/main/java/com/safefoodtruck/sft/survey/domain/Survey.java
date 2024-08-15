package com.safefoodtruck.sft.survey.domain;

import static jakarta.persistence.FetchType.LAZY;

import com.safefoodtruck.sft.member.domain.Member;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

@Entity
@Table(name = "survey")
@DynamicInsert
@DynamicUpdate
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@ToString
public class Survey {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "email")
    @NotNull
    private Member member;

    @Column(name = "store_type")
    private String storeType;

    @Column(name = "sido", length = 50)
    private String sido;

    @Column(name = "sigungu", length = 50)
    private String sigungu;

    @Column(name = "dong", length = 50)
    private String dong;

    @Column(name = "latitue", length = 30)
    private String latitude;

    @Column(name = "longitude", length = 30)
    private String longitude;

    @Builder
    public Survey(Member member, String storeType, String sido, String sigungu, String dong, String latitude, String longitude) {
        this.member = member;
        this.storeType = storeType;
        this.sido = sido;
        this.sigungu = sigungu;
        this.dong = dong;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}
