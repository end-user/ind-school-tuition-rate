package gov.vermont.aoe.edqual.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@Entity
public class SchoolHead {
    @Id
    @Column(name = "id", nullable = false)
    private Long id;

    private String name;
    private String phone;
    private String email;

    @OneToOne
    @JoinColumn(name = "schoolProfileId")
    private SchoolProfile schoolProfile;

    @OneToMany(mappedBy = "schoolHead", orphanRemoval = true)
    private Set<RateApplication> rateApplications;

}