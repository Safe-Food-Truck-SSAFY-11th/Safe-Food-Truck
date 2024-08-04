package com.safefoodtruck.sft.schedule.service;

import com.safefoodtruck.sft.schedule.dto.request.ScheduleInsertRequestDto;

public interface ScheduleService {
    void insertSchedule(String ownerEmail, ScheduleInsertRequestDto scheduleInsertRequestDto);
}
