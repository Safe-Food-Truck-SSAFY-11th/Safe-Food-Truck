package com.safefoodtruck.sft.favorites.controller;

import com.safefoodtruck.sft.common.dto.ErrorResponseDto;
import com.safefoodtruck.sft.common.util.MemberInfo;
import com.safefoodtruck.sft.favorites.dto.response.SelectMemberFavoriteResponseDto;
import com.safefoodtruck.sft.favorites.exception.ImpossibleRetryException;
import com.safefoodtruck.sft.favorites.service.FavoritesService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/favorites")
@RequiredArgsConstructor
@Slf4j
public class FavoritesController {

    private final FavoritesService favoritesService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ROLE_customer', 'ROLE_vip_customer')")
    @Operation(summary = "내가 찜한 목록 조회", description = "내가 찜한 목록을 조회할 때 사용하는 API")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",
                    description = "내가 찜한 목록 조회 성공",
                    content = @Content(mediaType = "application/json"))
    })
    public ResponseEntity<?> selectFavorites() {
        String userEmail = MemberInfo.getEmail();
        SelectMemberFavoriteResponseDto selectMemberFavoriteResponseDto = favoritesService.selectMemberFavorite(userEmail);
        return ResponseEntity.status(HttpStatus.OK).body(selectMemberFavoriteResponseDto);
    }

    @PostMapping("/{storeId}")
    @PreAuthorize("hasAnyRole('ROLE_customer', 'ROLE_vip_customer')")
    @Operation(summary = "가게 찜하기", description = "가게를 찜할 때 사용하는 API")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200",
            description = "가게 찜하기 성공",
            content = @Content(mediaType = "application/json")),
        @ApiResponse(responseCode = "500",
            description = "Error Message로 전달함",
            content = @Content(mediaType = "application/json"))
    })
    public ResponseEntity<?> insertFavorite(@PathVariable("storeId") Integer storeId) {
        String userEmail = MemberInfo.getEmail();
        favoritesService.insertMemberFavorite(userEmail, storeId);
        return ResponseEntity.status(HttpStatus.OK).body("가게 찜하기 성공");
    }

    @ExceptionHandler({ImpossibleRetryException.class})
    public ResponseEntity<?> ImpossibleExceptionHandler(ImpossibleRetryException e) {
        log.error("Notification 에러: {}", e.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .contentType(MediaType.APPLICATION_JSON)
            .body(new ErrorResponseDto(
                    HttpStatus.INTERNAL_SERVER_ERROR.value(),
                    e.getMessage(),
                    LocalDateTime.now()
                )
            );
    }
}
