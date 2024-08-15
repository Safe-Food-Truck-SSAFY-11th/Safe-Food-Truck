package com.safefoodtruck.sft.reply.service;

import com.safefoodtruck.sft.reply.dto.request.ReplyRegistRequestDto;
import com.safefoodtruck.sft.reply.dto.response.ReplyResponseDto;

public interface ReplyService {
	ReplyResponseDto registReply(ReplyRegistRequestDto replyRegistRequestDto);
}
