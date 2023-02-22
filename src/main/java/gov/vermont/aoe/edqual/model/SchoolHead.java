package gov.vermont.aoe.edqual.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "school_head")
public class SchoolHead {
    @Id
    @Column(name = "id", nullable = false)
    private Long id;

    private String name;
    private String phone;
    private String email;

    @OneToMany(mappedBy = "school", orphanRemoval = true)
    private Set<RateApplication> rateApplications;

}