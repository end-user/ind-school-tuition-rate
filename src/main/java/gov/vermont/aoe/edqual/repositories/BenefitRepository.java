package gov.vermont.aoe.edqual.repositories;

import gov.vermont.aoe.edqual.model.Benefit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BenefitRepository extends JpaRepository<Benefit, Long> {
}