package gov.vermont.aoe.edqual.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Currency;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "application_entry")
@Inheritance(strategy = InheritanceType.JOINED)
abstract class AbstractLedgerEntry {
    @Id
    @Column(name = "id", nullable = false)
    private Long id;

    private Currency actual;
    private Currency budget;

    @ManyToOne
    @JoinColumn(name = "rate_application_id")
    private RateApplication rateApplication;

    @Lob
    private String comment;

}