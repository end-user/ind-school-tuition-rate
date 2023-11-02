package gov.vermont.aoe.edqual.repositories;

import gov.vermont.aoe.edqual.model.RateApplication;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RateApplicationRepository extends JpaRepository<RateApplication, Long> {
}