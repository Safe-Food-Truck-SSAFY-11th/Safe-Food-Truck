package com.safefoodtruck.sft.order.dto.response;

import com.safefoodtruck.sft.order.domain.OrderMenu;
import java.util.List;

public record OrderRequestDto(Integer storeId, String request, List<OrderMenu> orderMenus) {

}
