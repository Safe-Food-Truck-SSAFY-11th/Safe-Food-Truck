package com.safefoodtruck.sft.member.domain;

import com.safefoodtruck.sft.member.dto.MemberImageDto;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

@Entity
@Table(name = "member_image")
@DynamicInsert
@DynamicUpdate
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class MemberImage {

    @Id
    @Column(name = "email")
    private String email;

    @OneToOne
    @MapsId
    @JoinColumn(name = "email")
    private Member member;

    @Column(name = "saved_url")
    private String savedUrl;

    @Column(name = "saved_path")
    private String savedPath;

    public void updateMemberImage(Member member, MemberImageDto memberImageDto) {
        this.member = member;
        this.savedUrl = memberImageDto.getSavedUrl();
        this.savedPath = memberImageDto.getSavedPath();
    }

    @Builder
    public MemberImage(Member member, MemberImageDto memberImageDto) {
        this.member = member;
        this.savedUrl = memberImageDto.getSavedUrl();
        this.savedPath = memberImageDto.getSavedPath();
    }
}
