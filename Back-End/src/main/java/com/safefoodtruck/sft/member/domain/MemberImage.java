package com.safefoodtruck.sft.member.domain;

import com.safefoodtruck.sft.member.dto.MemberImageDto;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
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
@Table(name = "memberimage")
@DynamicInsert
@DynamicUpdate
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class MemberImage {

    @Id
    @JoinColumn(name = "email")
    private String email;

    @Column(name = "saved_url")
    @NotNull
    private String savedUrl;

    @Column(name = "saved_path")
    @NotNull
    private String savedPath;

    @Builder
    public MemberImage(MemberImageDto memberImageDto) {
        this.email = memberImageDto.getEmail();
        this.savedUrl = memberImageDto.getSavedUrl();
        this.savedPath = memberImageDto.getSavedPath();
    }
}
