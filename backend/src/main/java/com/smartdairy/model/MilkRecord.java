package com.smartdairy.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "milk_records")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MilkRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "cow_id", nullable = false)
    private Cow cow;

    @Column(nullable = false)
    private LocalDate recordDate;

    @Column(nullable = false)
    private String shift; // MORNING, EVENING

    @Column(nullable = false)
    private Double quantityLiters;

    private Double fatPercentage;

    private Double snfPercentage;

    @Column(length = 500)
    private String notes;

    // Constructors
    public MilkRecord() {}

    public MilkRecord(Long id, Cow cow, LocalDate recordDate, String shift, Double quantityLiters, Double fatPercentage, Double snfPercentage, String notes) {
        this.id = id;
        this.cow = cow;
        this.recordDate = recordDate;
        this.shift = shift;
        this.quantityLiters = quantityLiters;
        this.fatPercentage = fatPercentage;
        this.snfPercentage = snfPercentage;
        this.notes = notes;
    }

    // Explicit Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Cow getCow() { return cow; }
    public void setCow(Cow cow) { this.cow = cow; }

    public LocalDate getRecordDate() { return recordDate; }
    public void setRecordDate(LocalDate recordDate) { this.recordDate = recordDate; }

    public String getShift() { return shift; }
    public void setShift(String shift) { this.shift = shift; }

    public Double getQuantityLiters() { return quantityLiters; }
    public void setQuantityLiters(Double quantityLiters) { this.quantityLiters = quantityLiters; }

    public Double getFatPercentage() { return fatPercentage; }
    public void setFatPercentage(Double fatPercentage) { this.fatPercentage = fatPercentage; }

    public Double getSnfPercentage() { return snfPercentage; }
    public void setSnfPercentage(Double snfPercentage) { this.snfPercentage = snfPercentage; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}
