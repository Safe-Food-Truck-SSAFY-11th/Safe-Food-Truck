package com.safefoodtruck.sft.schedule.dto.response;

import com.safefoodtruck.sft.schedule.dto.ScheduleDto;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ScheduleSelectResponseDto {
    List<ScheduleDto> scheduleList;
}
