package com.safefoodtruck.sft.member.repository;

import com.safefoodtruck.sft.member.domain.Member;
import java.time.LocalDate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, String> {
    Member findByEmail(String email);
    Member findByNickname(String nickname);
    Member findByNameAndBirthAndPhoneNumber(String name, LocalDate birth, String phoneNumber);
    Member findByEmailAndNameAndBirthAndPhoneNumber(String email, String name, LocalDate birth, String phoneNumber);
}
