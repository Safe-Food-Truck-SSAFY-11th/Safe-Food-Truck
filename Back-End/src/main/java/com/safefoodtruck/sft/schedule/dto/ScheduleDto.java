package com.safefoodtruck.sft.schedule.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ScheduleDto {
    private Integer scheduleId;
    private Integer storeId;
    private Integer day;
    private String address;
    private String addAddress;
}
