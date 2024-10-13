package com.safefoodtruck.sft.order.controller;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;

import com.safefoodtruck.sft.common.dto.ErrorResponseDto;
import com.safefoodtruck.sft.order.dto.request.OrderRegistRequestDto;
import com.safefoodtruck.sft.order.dto.response.CustomerOrderListResponseDto;
import com.safefoodtruck.sft.order.dto.response.OrderDetailResponseDto;
import com.safefoodtruck.sft.order.dto.response.OrderRegistResponseDto;
import com.safefoodtruck.sft.order.dto.response.OrderSummaryResponseDto;
import com.safefoodtruck.sft.order.dto.response.OwnerOrderListResponseDto;
import com.safefoodtruck.sft.order.dto.response.CustomerPreparingOrderListResponseDto;
import com.safefoodtruck.sft.order.dto.response.WeeklyCustomerOrderSummaryResponseDto;
import com.safefoodtruck.sft.order.exception.AlreadyCompletedOrderException;
import com.safefoodtruck.sft.order.exception.AlreadyProcessedOrderException;
import com.safefoodtruck.sft.order.exception.OrderNotFoundException;
import com.safefoodtruck.sft.order.exception.OrderNotPreparingException;
import com.safefoodtruck.sft.order.exception.UnAuthorizedOrderStatusUpdateException;
import com.safefoodtruck.sft.order.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
    @PreAuthorize("hasAnyRole('ROLE_customer', 'ROLE_vip_customer')")
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
        OrderRegistResponseDto order = orderService.registOrder(orderRegistRequestDto);
        return new ResponseEntity<>(order, CREATED);
    }

    @PatchMapping("{orderId}/accept")
    @PreAuthorize("hasAnyRole('ROLE_owner', 'ROLE_vip_owner')")
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
    public ResponseEntity<String> acceptOrder(@PathVariable("orderId") Integer orderId) {
        String status = orderService.acceptOrder(orderId);
        return new ResponseEntity<>(status, OK);
    }

    @PatchMapping("{orderId}/reject")
    @PreAuthorize("hasAnyRole('ROLE_owner', 'ROLE_vip_owner')")
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
    public ResponseEntity<String> rejectOrder(@PathVariable("orderId") Integer orderId) {
        String status = orderService.rejectOrder(orderId);
        return new ResponseEntity<>(status, OK);
    }

    @GetMapping("customers")
    @PreAuthorize("hasAnyRole('ROLE_customer', 'ROLE_vip_customer')")
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
    public ResponseEntity<CustomerOrderListResponseDto> findCustomerOrderList() {
        CustomerOrderListResponseDto customerOrderList = orderService.findCustomerOrderList();
        return new ResponseEntity<>(customerOrderList, OK);
    }
    @GetMapping("customers/preparing")
    @PreAuthorize("hasAnyRole('ROLE_customer', 'ROLE_vip_customer')")
    @Operation(summary = "진행 중인 주문 목록 조회(손님)", description = "진행 중인 주문 목록을 조회할 때 사용하는 API")
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "진행 중인 주문 목록 조회에 성공하였습니다!",
            content = @Content(mediaType = "application/json")
        ),
        @ApiResponse(
            responseCode = "500",
            description = "Error Message 로 전달함",
            content = @Content(mediaType = "application/json")
        )
    })
    public ResponseEntity<CustomerPreparingOrderListResponseDto> find() {
        CustomerPreparingOrderListResponseDto acceptedPreparingOrders = orderService.findAcceptedPreparingOrders();
        return new ResponseEntity<>(acceptedPreparingOrders, OK);
    }

    @GetMapping("/customers/pattern")
    @PreAuthorize("hasAnyRole('ROLE_customer', 'ROLE_vip_customer')")
    @Operation(summary = "주간 소비 패턴 조회", description = "주간 소비 패턴 조회할 때 사용하는 API")
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "주간 소비 패턴 조회에 성공하였습니다!",
            content = @Content(mediaType = "application/json")
        ),
        @ApiResponse(
            responseCode = "500",
            description = "Error Message 로 전달함",
            content = @Content(mediaType = "application/json")
        )
    })
    public ResponseEntity<WeeklyCustomerOrderSummaryResponseDto> getWeeklyOrderSummary() {
        WeeklyCustomerOrderSummaryResponseDto weeklyCustomerOrderSummary = orderService.getWeeklyCustomerOrderSummary();
        return new ResponseEntity<>(weeklyCustomerOrderSummary, OK);
    }

    @GetMapping("owners")
    @PreAuthorize("hasAnyRole('ROLE_owner', 'ROLE_vip_owner')")
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
    public ResponseEntity<OwnerOrderListResponseDto> findStoreOrderList() {
        OwnerOrderListResponseDto storeOrderList = orderService.findStoreOrderList();
        return new ResponseEntity<>(storeOrderList, OK);
    }

    @GetMapping("owners/sales")
    @PreAuthorize("hasAnyRole('ROLE_owner', 'ROLE_vip_owner')")
    @Operation(summary = "주간 매출 조회", description = "주간 매출을 조회할 때 사용하는 API")
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "주간 매출 조회에 성공하였습니다!",
            content = @Content(mediaType = "application/json")
        ),
        @ApiResponse(
            responseCode = "500",
            description = "Error Message 로 전달함",
            content = @Content(mediaType = "application/json")
        )
    })
    public ResponseEntity<List<OrderSummaryResponseDto>> findWeeklySales() {
        List<OrderSummaryResponseDto> weeklyOrderSummary = orderService.getWeeklyOrderSummary();
        return new ResponseEntity<>(weeklyOrderSummary, OK);
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
    public ResponseEntity<OrderDetailResponseDto> findOrderDetail(@PathVariable("orderId") final Integer orderId) {
        OrderDetailResponseDto orderDetail = orderService.findOrderDetail(orderId);
        return new ResponseEntity<>(orderDetail, OK);
    }

    @PatchMapping("{orderId}/complete")
    @PreAuthorize("hasAnyRole('ROLE_owner', 'ROLE_vip_owner')")
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
    public ResponseEntity<String> completeOrder(@PathVariable("orderId") Integer orderId) {
        String cookingStatus = orderService.completeOrder(orderId);
        return new ResponseEntity<>(cookingStatus, OK);
    }

    @ExceptionHandler({OrderNotPreparingException.class ,AlreadyCompletedOrderException.class, AlreadyProcessedOrderException.class, OrderNotFoundException.class,
        UnAuthorizedOrderStatusUpdateException.class})
    public ResponseEntity<ErrorResponseDto> orderException(Exception e) {
        ErrorResponseDto errorResponse = new ErrorResponseDto(
            HttpStatus.INTERNAL_SERVER_ERROR.value(),
            e.getMessage(),
            LocalDateTime.now()
        );
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .contentType(MediaType.APPLICATION_JSON)
            .body(errorResponse);
    }
}
