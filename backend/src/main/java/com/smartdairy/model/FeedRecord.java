package com.smartdairy.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "feed_records")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FeedRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDate recordDate;

    @Column(nullable = false)
    private String feedType; // Green Fodder, Dry Fodder, Concentrates, Mineral Mixture, Silage

    @Column(nullable = false)
    private Double quantityKg;

    private Double costPerKg;

    private Double totalCost;

    @Column(length = 500)
    private String notes;

    // Constructors
    public FeedRecord() {}

    public FeedRecord(Long id, LocalDate recordDate, String feedType, Double quantityKg, Double costPerKg, Double totalCost, String notes) {
        this.id = id;
        this.recordDate = recordDate;
        this.feedType = feedType;
        this.quantityKg = quantityKg;
        this.costPerKg = costPerKg;
        this.totalCost = totalCost;
        this.notes = notes;
    }

    // Explicit Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public LocalDate getRecordDate() { return recordDate; }
    public void setRecordDate(LocalDate recordDate) { this.recordDate = recordDate; }

    public String getFeedType() { return feedType; }
    public void setFeedType(String feedType) { this.feedType = feedType; }

    public Double getQuantityKg() { return quantityKg; }
    public void setQuantityKg(Double quantityKg) { this.quantityKg = quantityKg; }

    public Double getCostPerKg() { return costPerKg; }
    public void setCostPerKg(Double costPerKg) { this.costPerKg = costPerKg; }

    public Double getTotalCost() { return totalCost; }
    public void setTotalCost(Double totalCost) { this.totalCost = totalCost; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}
