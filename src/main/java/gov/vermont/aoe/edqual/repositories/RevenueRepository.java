package gov.vermont.aoe.edqual.repositories;

import gov.vermont.aoe.edqual.model.Revenue;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RevenueRepository extends JpaRepository<Revenue, Long> {
}