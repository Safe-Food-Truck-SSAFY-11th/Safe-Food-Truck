package com.safefoodtruck.sft.order.controller;

import static org.springframework.http.HttpStatus.*;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.safefoodtruck.sft.order.dto.request.OrderRegistRequestDto;
import com.safefoodtruck.sft.order.dto.response.OrderDetailResponseDto;
import com.safefoodtruck.sft.order.dto.response.OrderListResponseDto;
import com.safefoodtruck.sft.order.dto.response.OrderRegistResponseDto;
import com.safefoodtruck.sft.order.service.OrderService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

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
    public ResponseEntity<OrderRegistResponseDto> createOrder(@RequestBody OrderRegistRequestDto orderRegistRequestDto) {
        OrderRegistResponseDto order = orderService.order(orderRegistRequestDto);
        return new ResponseEntity<>(order, CREATED);
    }

    @PatchMapping("{orderId}/accept")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "주문 수락", description = "주문을 수락할 때 사용하는 API")
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "주문을 수락하였습니다!",
            content = @Content(mediaType = "application/json")
        ),
        @ApiResponse(
            responseCode = "500",
            description = "Error Message 로 전달함",
            content = @Content(mediaType = "application/json")
        )
    })
    public ResponseEntity<String> acceptOrder(@PathVariable Integer orderId) {
        log.info("before service orderId : {}", orderId);
        String status = orderService.acceptOrder(orderId);
        log.info("after service orderId : {}", orderId);
        return new ResponseEntity<>(status, OK);
    }

    @PatchMapping("{orderId}/reject")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "주문 거절", description = "주문을 거절할 때 사용하는 API")
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "주문을 거절하였습니다!",
            content = @Content(mediaType = "application/json")
        ),
        @ApiResponse(
            responseCode = "500",
            description = "Error Message 로 전달함",
            content = @Content(mediaType = "application/json")
        )
    })
    public ResponseEntity<String> rejectOrder(@PathVariable Integer orderId) {
        String status = orderService.rejectOrder(orderId);
        return new ResponseEntity<>(status, OK);
    }

    @GetMapping("customers")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "내 주문 목록 조회(손님)", description = "주문 목록을 조회할 때 사용하는 API")
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "내 주문 목록 조회에 성공하였습니다!",
            content = @Content(mediaType = "application/json")
        ),
        @ApiResponse(
            responseCode = "500",
            description = "Error Message 로 전달함",
            content = @Content(mediaType = "application/json")
        )
    })
    public ResponseEntity<OrderListResponseDto> findCustomerOrderList() {
        OrderListResponseDto customerOrderList = orderService.findCustomerOrderList();
        return new ResponseEntity<>(customerOrderList, OK);
    }

    @GetMapping("owners")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "주문 목록 조회(사장)", description = "주문 목록을 조회할 때 사용하는 API")
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "주문 목록 조회에 성공하였습니다!",
            content = @Content(mediaType = "application/json")
        ),
        @ApiResponse(
            responseCode = "500",
            description = "Error Message 로 전달함",
            content = @Content(mediaType = "application/json")
        )
    })
    public ResponseEntity<OrderListResponseDto> findStoreOrderList() {
        OrderListResponseDto storeOrderList = orderService.findStoreOrderList();
        return new ResponseEntity<>(storeOrderList, OK);
    }

    @GetMapping("{orderId}")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "주문 상세 조회", description = "주문을 상세 조회할 때 사용하는 API")
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "주문 상세 조회에 성공하였습니다!",
            content = @Content(mediaType = "application/json")
        ),
        @ApiResponse(
            responseCode = "500",
            description = "Error Message 로 전달함",
            content = @Content(mediaType = "application/json")
        )
    })
    public ResponseEntity<OrderDetailResponseDto> findOrderDetail(@PathVariable final Integer orderId) {
        OrderDetailResponseDto orderDetail = orderService.findOrderDetail(orderId);
        return new ResponseEntity<>(orderDetail, OK);
    }

    @PatchMapping("{orderId}/complete")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "주문 완료", description = "주문을 완료할 때 사용하는 API")
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "주문을 완료하였습니다!",
            content = @Content(mediaType = "application/json")
        ),
        @ApiResponse(
            responseCode = "500",
            description = "Error Message 로 전달함",
            content = @Content(mediaType = "application/json")
        )
    })
    public ResponseEntity<String> completeOrder(@PathVariable Integer orderId) {
        String cookingStatus = orderService.completeOrder(orderId);
        return new ResponseEntity<>(cookingStatus, OK);
    }
}
