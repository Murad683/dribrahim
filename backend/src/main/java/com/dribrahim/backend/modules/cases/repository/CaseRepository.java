package com.dribrahim.backend.modules.cases.repository;

import com.dribrahim.backend.modules.cases.domain.CaseEntity;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CaseRepository extends JpaRepository<CaseEntity, UUID> {
}
