package com.smartdairy.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStatsDto {
    private long totalCows;
    private long healthyCows;
    private long sickOrObservationCows;
    private double todayMilkLiters;
    private long pendingVaccinationsCount;
    private double currentMonthIncome;
    private double currentMonthExpense;
    private double netProfit;
    private List<Map<String, Object>> last7DaysMilkTrend;
    private List<Map<String, Object>> recentAlerts;

    public DashboardStatsDto() {}

    public DashboardStatsDto(long totalCows, long healthyCows, long sickOrObservationCows, double todayMilkLiters, long pendingVaccinationsCount, double currentMonthIncome, double currentMonthExpense, double netProfit, List<Map<String, Object>> last7DaysMilkTrend, List<Map<String, Object>> recentAlerts) {
        this.totalCows = totalCows;
        this.healthyCows = healthyCows;
        this.sickOrObservationCows = sickOrObservationCows;
        this.todayMilkLiters = todayMilkLiters;
        this.pendingVaccinationsCount = pendingVaccinationsCount;
        this.currentMonthIncome = currentMonthIncome;
        this.currentMonthExpense = currentMonthExpense;
        this.netProfit = netProfit;
        this.last7DaysMilkTrend = last7DaysMilkTrend;
        this.recentAlerts = recentAlerts;
    }

    // Explicit Getters and Setters
    public long getTotalCows() { return totalCows; }
    public void setTotalCows(long totalCows) { this.totalCows = totalCows; }

    public long getHealthyCows() { return healthyCows; }
    public void setHealthyCows(long healthyCows) { this.healthyCows = healthyCows; }

    public long getSickOrObservationCows() { return sickOrObservationCows; }
    public void setSickOrObservationCows(long sickOrObservationCows) { this.sickOrObservationCows = sickOrObservationCows; }

    public double getTodayMilkLiters() { return todayMilkLiters; }
    public void setTodayMilkLiters(double todayMilkLiters) { this.todayMilkLiters = todayMilkLiters; }

    public long getPendingVaccinationsCount() { return pendingVaccinationsCount; }
    public void setPendingVaccinationsCount(long pendingVaccinationsCount) { this.pendingVaccinationsCount = pendingVaccinationsCount; }

    public double getCurrentMonthIncome() { return currentMonthIncome; }
    public void setCurrentMonthIncome(double currentMonthIncome) { this.currentMonthIncome = currentMonthIncome; }

    public double getCurrentMonthExpense() { return currentMonthExpense; }
    public void setCurrentMonthExpense(double currentMonthExpense) { this.currentMonthExpense = currentMonthExpense; }

    public double getNetProfit() { return netProfit; }
    public void setNetProfit(double netProfit) { this.netProfit = netProfit; }

    public List<Map<String, Object>> getLast7DaysMilkTrend() { return last7DaysMilkTrend; }
    public void setLast7DaysMilkTrend(List<Map<String, Object>> last7DaysMilkTrend) { this.last7DaysMilkTrend = last7DaysMilkTrend; }

    public List<Map<String, Object>> getRecentAlerts() { return recentAlerts; }
    public void setRecentAlerts(List<Map<String, Object>> recentAlerts) { this.recentAlerts = recentAlerts; }
}
