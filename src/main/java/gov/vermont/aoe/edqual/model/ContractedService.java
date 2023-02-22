package gov.vermont.aoe.edqual.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "contracted_service")
public class ContractedService extends AbstractLedgerEntry {
    private String service;
    private String provider;
}