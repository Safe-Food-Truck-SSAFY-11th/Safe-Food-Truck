package com.safefoodtruck.sft.member.repository;

import com.safefoodtruck.sft.member.domain.Member;
import com.safefoodtruck.sft.member.domain.MemberImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberImageRepository extends JpaRepository<MemberImage, Member> {
    MemberImage findByMember(Member member);
}
