package com.smartdairy.service;

import com.smartdairy.dto.DashboardStatsDto;
import com.smartdairy.model.HealthRecord;
import com.smartdairy.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class DashboardService {

    @Autowired
    private CowRepository cowRepository;

    @Autowired
    private MilkRecordRepository milkRecordRepository;

    @Autowired
    private HealthRecordRepository healthRecordRepository;

    @Autowired
    private FinanceRecordRepository financeRecordRepository;

    public DashboardStatsDto getDashboardStats() {
        LocalDate today = LocalDate.now();
        LocalDate startOfMonth = today.withDayOfMonth(1);
        LocalDate endOfMonth = today.plusMonths(1).withDayOfMonth(1).minusDays(1);

        DashboardStatsDto dto = new DashboardStatsDto();

        // Cow metrics
        long totalCows = cowRepository.count();
        long healthyCows = cowRepository.findByHealthStatus("Healthy").size();
        long sickOrObs = totalCows - healthyCows;
        dto.setTotalCows(totalCows);
        dto.setHealthyCows(healthyCows);
        dto.setSickOrObservationCows(sickOrObs);

        // Milk today
        Double todayMilk = milkRecordRepository.sumQuantityByDate(today);
        dto.setTodayMilkLiters(todayMilk != null ? Math.round(todayMilk * 10.0) / 10.0 : 0.0);

        // Health alerts (upcoming within next 14 days or overdue)
        List<HealthRecord> upcoming = healthRecordRepository.findUpcomingAlerts(today.plusDays(14));
        dto.setPendingVaccinationsCount(upcoming.size());

        List<Map<String, Object>> alerts = new ArrayList<>();
        for (HealthRecord hr : upcoming) {
            Map<String, Object> alertMap = new HashMap<>();
            alertMap.put("id", hr.getId());
            alertMap.put("cowTag", hr.getCow() != null ? hr.getCow().getTagNumber() : "Unknown");
            alertMap.put("cowName", hr.getCow() != null ? hr.getCow().getName() : "");
            alertMap.put("title", hr.getIssueOrVaccine());
            alertMap.put("dueDate", hr.getNextDueDate() != null ? hr.getNextDueDate().toString() : "");
            alertMap.put("isOverdue", hr.getNextDueDate() != null && hr.getNextDueDate().isBefore(today));
            alerts.add(alertMap);
        }
        dto.setRecentAlerts(alerts);

        // Financial totals for this month
        Double income = financeRecordRepository.sumAmountByTypeAndDateRange("INCOME", startOfMonth, endOfMonth);
        Double expense = financeRecordRepository.sumAmountByTypeAndDateRange("EXPENSE", startOfMonth, endOfMonth);
        dto.setCurrentMonthIncome(income != null ? income : 0.0);
        dto.setCurrentMonthExpense(expense != null ? expense : 0.0);
        dto.setNetProfit((income != null ? income : 0.0) - (expense != null ? expense : 0.0));

        // Last 7 days milk production trend
        List<Map<String, Object>> trend = new ArrayList<>();
        DateTimeFormatter dayFormatter = DateTimeFormatter.ofPattern("EEE (dd/MM)");
        for (int i = 6; i >= 0; i--) {
            LocalDate d = today.minusDays(i);
            Double daySum = milkRecordRepository.sumQuantityByDate(d);
            Map<String, Object> dayPoint = new HashMap<>();
            dayPoint.put("date", d.toString());
            dayPoint.put("label", d.format(dayFormatter));
            dayPoint.put("liters", daySum != null ? Math.round(daySum * 10.0) / 10.0 : 0.0);
            trend.add(dayPoint);
        }
        dto.setLast7DaysMilkTrend(trend);

        return dto;
    }
}
