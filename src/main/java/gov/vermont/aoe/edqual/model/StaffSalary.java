package gov.vermont.aoe.edqual.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class StaffSalary extends AbstractLedgerEntry {
    private String positionTitle;
    /**
     * Will indicate either Filled or Vacant
     */
    private String status;
    /**
     * Describes percentage of time devoted to general education
     */
    private Float genEdu;
    /**
     * Percentage of time performing special education work
     */
    private Short speEdu;
}