package gov.vermont.aoe.edqual.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

import java.util.Currency;

@Getter
@Setter
@Entity
public class NetProgramCosts {
    @Id
    @Column(name = "id", nullable = false)
    private Long id;

    private Currency salaryActuals;
    private Currency salaryNet;
    private Currency benefitActuals;
    private Currency benefitNet;
    private Currency expenseActuals;
    private Currency expenseNet;
    private Currency serviceActuals;
    private Currency serviceNet;
    private Currency revenueActuals;
    private Currency revenueNet;

}
