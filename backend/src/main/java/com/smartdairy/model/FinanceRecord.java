package com.smartdairy.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "finance_records")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FinanceRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDate transactionDate;

    @Column(nullable = false)
    private String type; // INCOME, EXPENSE

    @Column(nullable = false)
    private String category; // MILK_SALE, CATTLE_SALE, FEED, VET_MEDICINE, EQUIPMENT, LABOUR, OTHER

    @Column(nullable = false)
    private Double amount;

    private String description;

    // Constructors
    public FinanceRecord() {}

    public FinanceRecord(Long id, LocalDate transactionDate, String type, String category, Double amount, String description) {
        this.id = id;
        this.transactionDate = transactionDate;
        this.type = type;
        this.category = category;
        this.amount = amount;
        this.description = description;
    }

    // Explicit Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public LocalDate getTransactionDate() { return transactionDate; }
    public void setTransactionDate(LocalDate transactionDate) { this.transactionDate = transactionDate; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
