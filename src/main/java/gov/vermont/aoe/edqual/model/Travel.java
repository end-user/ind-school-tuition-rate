package gov.vermont.aoe.edqual.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "travel")
public class Travel extends AbstractLedgerEntry {
    private String purpose;
    private String origin;
    private String destination;
    private String transportationType;

}