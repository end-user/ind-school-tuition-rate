package gov.vermont.aoe.edqual.repositories;

import gov.vermont.aoe.edqual.model.AllowableExpense;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AllowableExpenseRepository extends JpaRepository<AllowableExpense, Long> {
}