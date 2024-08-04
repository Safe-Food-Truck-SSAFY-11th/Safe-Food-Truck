package com.safefoodtruck.sft.schedule.dto.request;

import lombok.Data;

@Data
public class ScheduleInsertRequestDto {
    private Integer storeId;
    private Integer day;
    private String address;
    private String addAddress;
}
