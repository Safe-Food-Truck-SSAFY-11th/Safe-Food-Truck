package com.safefoodtruck.sft.survey.domain;

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

    @ManyToOne
    @JoinColumn(name = "email")
    @NotNull
    private Member member;

    @Column(name = "store_type")
    private String storeType;

    @Column(name = "dong")
    private String dong;

    @Column(name = "sigungu")
    private String sigungu;

    @Column(name = "latitue")
    private String latitude;

    @Column(name = "longitude")
    private String longitude;

    @Builder
    public Survey(Member member, String storeType, String dong, String sigungu, String latitude, String longitude) {
        this.member = member;
        this.storeType = storeType;
        this.dong = dong;
        this.sigungu = sigungu;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}
