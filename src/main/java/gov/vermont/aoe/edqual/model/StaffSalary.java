package gov.vermont.aoe.edqual.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "staff_salary")
public class StaffSalary  extends AbstractLedgerEntry {
    private String positionTitle;
    private String staffCategory;
    private String status;
    /**
     * Describes how much time the employee participates.  Should be a max of 1?
     * <p>
     * From instructions: A full-time equivalent, 1.0 FTE, is one person working an entire work day, each week for the
     * duration of the school year. Express any partial FTEs in decimals. For example a teacher working one day per week
     * for the duration of the school year would be reflected as 0.2 FTE.
     */
    private Float fte;
    /**
     * Percentage of time performing special education work
     */
    private Short speEdu;
    private Float payRate;
}