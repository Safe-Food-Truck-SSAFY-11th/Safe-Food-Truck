package com.safefoodtruck.sft.openvidu.controller;

import com.safefoodtruck.sft.redis.dto.OpenviduDto;
import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.safefoodtruck.sft.common.dto.ErrorResponseDto;
import com.safefoodtruck.sft.openvidu.exception.NullSessionException;
import com.safefoodtruck.sft.openvidu.exception.OpenviduException;
import com.safefoodtruck.sft.openvidu.service.OpenviduService;
import com.safefoodtruck.sft.redis.dto.RedisDto;
import com.safefoodtruck.sft.redis.service.RedisService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/sessions")
@RequiredArgsConstructor
public class OpenviduController {

	private final OpenviduService openviduService;
	private final RedisService redisService;

	/**
	 * @param params The Session properties
	 * @return The Session ID
	 */
	@PostMapping
	public ResponseEntity<String> initializeSession(@RequestBody Map<String, Object> params) {
		String sessionId = openviduService.initSession(params);
		return new ResponseEntity<>(sessionId, HttpStatus.OK);
	}

	/**
	 * @param sessionId The Session in which to create the Connection
	 * @param params    The Connection properties
	 * @return The Token associated to the Connection
	 */
	@PostMapping("/{sessionId}")
	public ResponseEntity<String> createConnection(
		@PathVariable("sessionId") String sessionId,
		@RequestBody(required = false) Map<String, Object> params
	) {
		String openviduToken = openviduService.connectSession(sessionId, params);
		RedisDto.builder().build();
		String getValue = redisService.getValue(sessionId);
		Integer viewers = 0;
		if (getValue != null) {
			viewers = Integer.parseInt(getValue) + 1;
		}
		getValue = viewers.toString();
		redisService.setValue(RedisDto.builder().key(sessionId).value(getValue).build());
		return new ResponseEntity<>(openviduToken, HttpStatus.OK);
	}

	@PostMapping("/{sessionId}/close")
	public ResponseEntity<Void> closeConnection(
		@PathVariable("sessionId") String sessionId
	) {
		openviduService.closeSession(sessionId);
		redisService.deleteValue(RedisDto.builder().key(sessionId).build());

		return new ResponseEntity<>(HttpStatus.OK);
	}

	@ExceptionHandler({NullSessionException.class, OpenviduException.class})
	public ResponseEntity<ErrorResponseDto> notificationExceptionHandler(Exception e) {
		log.error("Openvidu 에러: {}", e.getMessage());
		return ResponseEntity.status(HttpStatus.NO_CONTENT)
			.contentType(MediaType.APPLICATION_JSON)
			.body(new ErrorResponseDto(
					HttpStatus.NO_CONTENT.value(),
					e.getMessage(),
					LocalDateTime.now()
				)
			);
	}

	@PostMapping("/get-live-list")
	public ResponseEntity<ArrayList<OpenviduDto>> getLiveList() {
		ArrayList<OpenviduDto> liveList = redisService.getLiveList();
		return new ResponseEntity<>(liveList, HttpStatus.OK);
	}

	@GetMapping("/isLive/{sessionId}")
	public ResponseEntity<?> isLive(@PathVariable("sessionId") String sessionId) {
		Boolean isLive = redisService.getValue(sessionId) == null ? false : true;
		return new ResponseEntity<>(isLive, HttpStatus.OK);
	}
}
