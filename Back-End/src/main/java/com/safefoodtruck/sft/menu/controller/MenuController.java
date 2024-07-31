package com.safefoodtruck.sft.menu.controller;

import com.safefoodtruck.sft.menu.dto.request.MenuListRegistRequestDto;
import com.safefoodtruck.sft.menu.dto.response.MenuRegistResponseDto;
import com.safefoodtruck.sft.menu.service.MenuService;
import com.safefoodtruck.sft.store.service.StoreService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequestMapping("/menu")
@RestController
@RequiredArgsConstructor
public class MenuController {

	private final MenuService menuService;
	private final StoreService storeService;

	@PostMapping
	@Operation(summary = "메뉴 등록", description = "메뉴를 등록할 때 사용하는 API")
	@ApiResponses(value = {
		@ApiResponse(
			responseCode = "201",
			description = "메뉴등록에 성공하였습니다!",
			content = @Content(mediaType = "application/json")
		),
		@ApiResponse(
			responseCode = "500",
			description = "Error Message 로 전달함",
			content = @Content(mediaType = "application/json")
		)
	})
	public ResponseEntity<?> registMenu(@RequestBody MenuListRegistRequestDto menuListRegistRequestDto) {
		List<MenuRegistResponseDto> menuRegistResponseDtos = menuService.registMenu(
			menuListRegistRequestDto);
		return new ResponseEntity<>(menuRegistResponseDtos, HttpStatus.CREATED);
	}
}
