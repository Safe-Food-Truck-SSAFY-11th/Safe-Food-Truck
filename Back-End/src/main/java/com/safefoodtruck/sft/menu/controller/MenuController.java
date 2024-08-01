package com.safefoodtruck.sft.menu.controller;

import com.safefoodtruck.sft.menu.dto.request.MenuListRegistRequestDto;
import com.safefoodtruck.sft.menu.dto.request.MenuUpdateRequestDto;
import com.safefoodtruck.sft.menu.dto.response.MenuListResponseDto;
import com.safefoodtruck.sft.menu.dto.response.MenuResponseDto;
import com.safefoodtruck.sft.menu.service.MenuService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequestMapping("/menus")
@RestController
@RequiredArgsConstructor
public class MenuController {

	private final MenuService menuService;

	@PostMapping
	@PreAuthorize("isAuthenticated()")
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
		MenuListResponseDto menuListResponseDto = menuService.registMenu(
			menuListRegistRequestDto);
		return new ResponseEntity<>(menuListResponseDto, HttpStatus.CREATED);
	}

	@GetMapping("{menuId}")
	@PreAuthorize("isAuthenticated()")
	@Operation(summary = "메뉴 상세 조회", description = "메뉴 상세 조회할 때 사용하는 API")
	@ApiResponses(value = {
		@ApiResponse(
			responseCode = "200",
			description = "메뉴 상세 조회에 성공하였습니다!",
			content = @Content(mediaType = "application/json")
		),
		@ApiResponse(
			responseCode = "500",
			description = "Error Message 로 전달함",
			content = @Content(mediaType = "application/json")
		)
	})
	public ResponseEntity<?> findMenu(@PathVariable Integer menuId) {
		MenuResponseDto menu = menuService.findMenu(menuId);
		return new ResponseEntity<>(menu, HttpStatus.OK);
	}

	@PatchMapping("{menuId}")
	@PreAuthorize("isAuthenticated()")
	@Operation(summary = "메뉴 수정", description = "메뉴를 수정할 때 사용하는 API")
	@ApiResponses(value = {
		@ApiResponse(
			responseCode = "200",
			description = "메뉴 수정에 성공하였습니다!",
			content = @Content(mediaType = "application/json")
		),
		@ApiResponse(
			responseCode = "500",
			description = "Error Message 로 전달함",
			content = @Content(mediaType = "application/json")
		)
	})
	public ResponseEntity<?> updateMenu(@PathVariable Integer menuId, @RequestBody MenuUpdateRequestDto menuUpdateRequestDto) {
		MenuResponseDto menuResponseDto = menuService.updateMenu(menuId, menuUpdateRequestDto);

		return new ResponseEntity<>(menuResponseDto, HttpStatus.OK);
	}

	@DeleteMapping("{menuId}")
	@PreAuthorize("isAuthenticated()")
	@Operation(summary = "점포 삭제", description = "점포를 삭제할 때 사용하는 API")
	@ApiResponses(value = {
		@ApiResponse(
			responseCode = "204",
			description = "점포삭제에 성공하였습니다!",
			content = @Content(mediaType = "application/json")
		),
		@ApiResponse(
			responseCode = "500",
			description = "Error Message 로 전달함",
			content = @Content(mediaType = "application/json")
		)
	})
	public ResponseEntity<?> deleteMenu(@PathVariable Integer menuId) {
		menuService.deleteMenu(menuId);

		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
