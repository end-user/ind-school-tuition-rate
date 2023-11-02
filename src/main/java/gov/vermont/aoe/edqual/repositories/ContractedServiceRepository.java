package gov.vermont.aoe.edqual.repositories;

import gov.vermont.aoe.edqual.model.ContractedService;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContractedServiceRepository extends JpaRepository<ContractedService, Long> {
}