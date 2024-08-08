package com.safefoodtruck.sft.reply.controller;

import static org.springframework.http.HttpStatus.CREATED;

import com.safefoodtruck.sft.reply.dto.request.ReplyRegistRequestDto;
import com.safefoodtruck.sft.reply.dto.response.ReplyResponseDto;
import com.safefoodtruck.sft.reply.service.ReplyService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequestMapping("/replies")
@RestController
@RequiredArgsConstructor
public class ReplyController {

	private final ReplyService replyService;


	@PostMapping
	@PreAuthorize("hasAnyRole('ROLE_owner', 'ROLE_vip_owner')")
	@Operation(summary = "답글 등록", description = "답글을 등록할 때 사용하는 API")
	@ApiResponses(value = {
		@ApiResponse(
			responseCode = "201",
			description = "답글 등록에 성공하였습니다!",
			content = @Content(mediaType = "application/json")
		),
		@ApiResponse(
			responseCode = "500",
			description = "Error Message 로 전달함",
			content = @Content(mediaType = "application/json")
		)
	})
	public ResponseEntity<ReplyResponseDto> registReply(
		@RequestBody ReplyRegistRequestDto replyRegistRequestDto) {
		ReplyResponseDto replyResponseDto = replyService.registReply(replyRegistRequestDto);

		return new ResponseEntity<>(replyResponseDto, CREATED);
	}
}
