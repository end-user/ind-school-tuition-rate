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

    private String name;
    private String address;

    @OneToOne
    @JoinColumn(name = "head_id")
    private SchoolHead head;
    private Integer approvedCapacity;
    private Integer priorYearEnrollment;
    private Integer expectedEnrollment;

}