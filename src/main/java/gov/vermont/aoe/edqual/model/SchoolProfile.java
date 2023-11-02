package gov.vermont.aoe.edqual.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
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

    /**
     * School Board approved capacity for the institution. This value is entered by {Deb} and cannot be retrieved from
     * the data API
     */
    private Integer approvedCapacity;
    private String address;
    private String cityStateZip;

    @OneToOne
    @JoinColumn(name = "schoolHeadId")
    private SchoolHead schoolHead;

}