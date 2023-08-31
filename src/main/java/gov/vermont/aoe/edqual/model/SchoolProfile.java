package gov.vermont.aoe.edqual.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "school_profile")
public class SchoolProfile {
    @Id
    @Column(name = "id", nullable = false)
    private Long id;
    /**
     * id reported from the data api
     */
    private String orgId;

    private String name;
    private String gradeRange;
    private String address;
    private String cityStateZip;


    @OneToOne
    @JoinColumn(name = "head_id")
    private SchoolHead schoolHead;
    private Integer approvedCapacity;
    private Integer priorYearEnrollment;
    private Integer expectedEnrollment;

}