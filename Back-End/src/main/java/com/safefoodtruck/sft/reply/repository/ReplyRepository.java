package com.safefoodtruck.sft.reply.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.safefoodtruck.sft.reply.domain.Reply;

public interface ReplyRepository extends JpaRepository<Reply, Integer> {

}
