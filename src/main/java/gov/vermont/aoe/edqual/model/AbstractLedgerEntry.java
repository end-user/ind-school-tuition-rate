package gov.vermont.aoe.edqual.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
abstract class AbstractLedgerEntry {
    @Id
    @Column(name = "id", nullable = false)
    private Long id;

    private Float fyActual;
    private Float fyBudget;

    @ManyToOne
    @JoinColumn(name = "rate_application_id")
    private RateApplication rateApplication;

    @OneToMany(orphanRemoval = true)
    @JoinColumn(name = "abstract_ledger_entry_id")
    private Set<Comment> comments;

}