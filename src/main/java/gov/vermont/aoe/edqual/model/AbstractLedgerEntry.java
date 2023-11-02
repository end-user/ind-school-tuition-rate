package gov.vermont.aoe.edqual.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Currency;

@Getter
@Setter
@Entity
@Table(name = "ApplicationEntry")
@Inheritance(strategy = InheritanceType.JOINED)
abstract class AbstractLedgerEntry {
    @Id
    @Column(name = "id", nullable = false)
    private Long id;

    private Currency actual;
    private Currency budget;

    @ManyToOne
    @JoinColumn(name = "rateApplicationId")
    private RateApplication rateApplication;

    @Lob
    private String comment;

}