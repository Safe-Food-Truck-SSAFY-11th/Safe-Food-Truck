package com.safefoodtruck.sft.order.controller;

import static org.springframework.http.HttpStatus.CREATED;

import com.safefoodtruck.sft.order.dto.request.OrderListRequestDto;
import com.safefoodtruck.sft.order.service.OrderService;
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
@RequestMapping("/orders")
@RestController
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "주문 생성", description = "주문을 생성할 때 사용하는 API")
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "201",
            description = "주문 생성에 성공하였습니다!",
            content = @Content(mediaType = "application/json")
        ),
        @ApiResponse(
            responseCode = "500",
            description = "Error Message 로 전달함",
            content = @Content(mediaType = "application/json")
        )
    })
    public ResponseEntity<?> createOrder(@RequestBody OrderListRequestDto orderListRequestDto) {
        Integer orderId = orderService.order(orderListRequestDto);
        return new ResponseEntity<>(orderId, CREATED);
    }
}
