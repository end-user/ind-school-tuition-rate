package gov.vermont.aoe.edqual.model;

import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@MappedSuperclass
class AbstractItem extends AbstractLedgerEntry {
    private Short quantity;
    private Float unitCost;
}