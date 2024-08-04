package com.safefoodtruck.sft.schedule.dto;

import lombok.Data;

@Data
public class ScheduleDto {
    private Integer storeId;
    private Integer day;
    private String address;
    private String addAddress;
}
