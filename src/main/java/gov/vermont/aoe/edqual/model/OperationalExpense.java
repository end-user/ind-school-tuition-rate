package gov.vermont.aoe.edqual.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "operational_expense")
public class OperationalExpense extends AbstractItem {
    private String item;
}