package gov.vermont.aoe.edqual.repositories;

import gov.vermont.aoe.edqual.model.SchoolProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SchoolProfileRepository extends JpaRepository<SchoolProfile, Long> {
}