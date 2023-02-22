package gov.vermont.aoe.edqual.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "revenue")
public class Revenue extends AbstractLedgerEntry {
    private String revenueSource;
}