package com.safefoodtruck.sft.report.service;

import com.safefoodtruck.sft.report.dto.request.ReportInsertRequestDto;
import com.safefoodtruck.sft.report.dto.response.ReportInsertResponseDto;
import com.safefoodtruck.sft.report.dto.response.ReportSelectResponseDto;

public interface ReportService {
    ReportInsertResponseDto insertReport(String userEmail, ReportInsertRequestDto reportInsertRequestDto);
    ReportSelectResponseDto selectReport(String userEmail, Integer reviewId);
}
