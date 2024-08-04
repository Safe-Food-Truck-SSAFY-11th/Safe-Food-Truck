package com.safefoodtruck.sft.schedule.service;

import com.safefoodtruck.sft.schedule.dto.request.ScheduleInsertRequestDto;
import com.safefoodtruck.sft.schedule.dto.response.ScheduleSelectResponseDto;

public interface ScheduleService {
    void insertSchedule(String ownerEmail, ScheduleInsertRequestDto scheduleInsertRequestDto);
    ScheduleSelectResponseDto selectSchedule(Integer storeId);
    void deleteSchedule(String ownerEmail, Integer scheduleId);
}
