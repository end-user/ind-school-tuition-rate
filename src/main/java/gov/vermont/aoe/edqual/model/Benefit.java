package gov.vermont.aoe.edqual.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "benefit")
public class Benefit extends AbstractLedgerEntry {
    private String benefit;
    /**
     * should only be present when the benefit is "Other"
     */
    private String description;
}