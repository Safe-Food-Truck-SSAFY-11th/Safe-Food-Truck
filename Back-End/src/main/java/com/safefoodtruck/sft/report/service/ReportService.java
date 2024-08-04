package com.safefoodtruck.sft.report.service;

import com.safefoodtruck.sft.report.dto.request.ReportInsertRequestDto;
import com.safefoodtruck.sft.report.dto.response.ReportInsertResponseDto;

public interface ReportService {
    ReportInsertResponseDto insertReport(String userEmail, ReportInsertRequestDto reportInsertRequestDto);
}
