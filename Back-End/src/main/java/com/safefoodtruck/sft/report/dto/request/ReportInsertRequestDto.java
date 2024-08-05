package com.safefoodtruck.sft.report.dto.request;

import lombok.Data;

@Data
public class ReportInsertRequestDto {
    private Integer reviewId;
    private String description;
}
