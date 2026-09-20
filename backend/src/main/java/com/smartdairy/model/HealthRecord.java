package com.smartdairy.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "health_records")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HealthRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "cow_id", nullable = false)
    private Cow cow;

    @Column(nullable = false)
    private String issueOrVaccine; // e.g. "FMD Vaccine", "Mastitis Treatment", "Deworming"

    @Column(nullable = false)
    private LocalDate administeredDate;

    private LocalDate nextDueDate;

    private String vetName;

    private Double cost;

    @Column(nullable = false)
    private String status; // SCHEDULED, COMPLETED, PENDING

    @Column(length = 1000)
    private String treatmentNotes;

    // Constructors
    public HealthRecord() {}

    public HealthRecord(Long id, Cow cow, String issueOrVaccine, LocalDate administeredDate, LocalDate nextDueDate, String vetName, Double cost, String status, String treatmentNotes) {
        this.id = id;
        this.cow = cow;
        this.issueOrVaccine = issueOrVaccine;
        this.administeredDate = administeredDate;
        this.nextDueDate = nextDueDate;
        this.vetName = vetName;
        this.cost = cost;
        this.status = status;
        this.treatmentNotes = treatmentNotes;
    }

    // Explicit Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Cow getCow() { return cow; }
    public void setCow(Cow cow) { this.cow = cow; }

    public String getIssueOrVaccine() { return issueOrVaccine; }
    public void setIssueOrVaccine(String issueOrVaccine) { this.issueOrVaccine = issueOrVaccine; }

    public LocalDate getAdministeredDate() { return administeredDate; }
    public void setAdministeredDate(LocalDate administeredDate) { this.administeredDate = administeredDate; }

    public LocalDate getNextDueDate() { return nextDueDate; }
    public void setNextDueDate(LocalDate nextDueDate) { this.nextDueDate = nextDueDate; }

    public String getVetName() { return vetName; }
    public void setVetName(String vetName) { this.vetName = vetName; }

    public Double getCost() { return cost; }
    public void setCost(Double cost) { this.cost = cost; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getTreatmentNotes() { return treatmentNotes; }
    public void setTreatmentNotes(String treatmentNotes) { this.treatmentNotes = treatmentNotes; }
}
