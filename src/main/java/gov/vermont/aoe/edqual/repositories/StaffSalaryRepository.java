package gov.vermont.aoe.edqual.repositories;

import gov.vermont.aoe.edqual.model.StaffSalary;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StaffSalaryRepository extends JpaRepository<StaffSalary, Long> {
}