package com.safefoodtruck.sft.menu.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.webjars.NotFoundException;

import com.safefoodtruck.sft.menu.dto.request.MenuListRegistRequestDto;
import com.safefoodtruck.sft.menu.dto.response.MenuRegistResponseDto;
import com.safefoodtruck.sft.menu.service.MenuService;
import com.safefoodtruck.sft.store.domain.Store;
import com.safefoodtruck.sft.store.service.StoreService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/api/menu")
@RestController
@RequiredArgsConstructor
public class MenuController {

	private final MenuService menuService;
	private final StoreService storeService;

	@PostMapping
	@Operation(summary = "메뉴 등록", description = "메뉴를 등록할 때 사용하는 API")
	@ApiResponses(value = {
		@ApiResponse(
			responseCode = "200",
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
		String email = SecurityContextHolder.getContext().getAuthentication().getName();
		log.info("email : {}", email);

		Store store = storeService.findStore();
		log.info("store : {}", store.toString());

		try {
			List<MenuRegistResponseDto> menuRegistResponseDtos = menuService.registMenu(
				store.getId(), menuListRegistRequestDto);
			return new ResponseEntity<>(menuRegistResponseDtos, HttpStatus.CREATED);
		} catch (NotFoundException nfe) {
			return new ResponseEntity<>("스토어 발견 x",HttpStatus.NOT_FOUND);
	 	} catch (Exception e) {
			return new ResponseEntity<>("Error : " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}

	}
}
