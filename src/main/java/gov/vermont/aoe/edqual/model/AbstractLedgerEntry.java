package gov.vermont.aoe.edqual.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Collection;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "application_entry")
@Inheritance(strategy = InheritanceType.JOINED)
abstract class AbstractLedgerEntry {
    @Id
    @Column(name = "id", nullable = false)
    private Long id;

    private Float fyActual;
    private Float fyBudget;

    @ManyToOne
    @JoinColumn(name = "rate_application_id")
    private RateApplication rateApplication;

    @OneToMany(mappedBy = "entry", orphanRemoval = true)
    private Set<Comment> comments;

}