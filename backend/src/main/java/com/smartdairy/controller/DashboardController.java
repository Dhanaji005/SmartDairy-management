package com.smartdairy.controller;

import com.smartdairy.dto.DashboardStatsDto;
import com.smartdairy.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/stats")
    public DashboardStatsDto getDashboardStats() {
        return dashboardService.getDashboardStats();
    }
}
