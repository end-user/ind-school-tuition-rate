package gov.vermont.aoe.edqual.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "Expenses")
public class AllowableExpense extends AbstractLedgerEntry{
    private String expense;
    private String type;
}
