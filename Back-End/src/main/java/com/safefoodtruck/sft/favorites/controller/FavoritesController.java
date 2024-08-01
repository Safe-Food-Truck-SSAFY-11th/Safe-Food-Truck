package com.safefoodtruck.sft.favorites.controller;

import com.safefoodtruck.sft.common.util.MemberInfo;
import com.safefoodtruck.sft.favorites.dto.response.SelectMemberFavoriteResponseDto;
import com.safefoodtruck.sft.favorites.service.FavoritesService;
import groovy.util.logging.Slf4j;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
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
}
