package gov.vermont.aoe.edqual.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Digits;
import lombok.Getter;
import lombok.Setter;

import java.util.Collection;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Getter
@Setter
@Entity
@Table(name = "rate_application")
public class RateApplication {
    @Id
    @Column(name = "id", nullable = false)
    private Long id;

    @Digits(integer = 4, fraction = 0)
    @Column(length = 4)
    private String schoolYear;
    @ManyToOne
    @JoinColumn(name = "school_id")
    private SchoolHead school;

    @OneToMany(mappedBy = "rateApplication", orphanRemoval = true)
    private Set<StaffSalary> staffSalaries;
    @OneToMany(mappedBy = "rateApplication", orphanRemoval = true)
    private Set<Benefit> benefits;
    @OneToMany(mappedBy = "rateApplication", orphanRemoval = true)
    private Set<Travel> travels;
    @OneToMany(mappedBy = "rateApplication", orphanRemoval = true)
    private Set<ContractedService> contractedServices;
    @OneToMany(mappedBy = "rateApplication", orphanRemoval = true)
    private Set<Supply> supplies;
    @OneToMany(mappedBy = "rateApplication", orphanRemoval = true)
    private Set<Equipment> equipment;
    @OneToMany(mappedBy = "rateApplication", orphanRemoval = true)
    private Set<OperationalExpense> operationalExpenses;

    @OneToMany(mappedBy = "rateApplication", orphanRemoval = true)
    private Set<Revenue> revenues;
    /**
     * convenience method to return all the expenses; should provide access to sum the actuals, budget
     * @return
     */
    public Set<AbstractLedgerEntry> getExpenses() {
        return Stream.of(
                        staffSalaries,
                        benefits,
                        travels,
                        contractedServices,
                        supplies,
                        equipment,
                        operationalExpenses
                )
                .flatMap(Collection::stream)
                .collect(Collectors.toSet());
    }
}