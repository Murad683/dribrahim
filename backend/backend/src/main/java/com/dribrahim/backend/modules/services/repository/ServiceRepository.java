package com.dribrahim.backend.modules.services.repository;

import com.dribrahim.backend.modules.services.domain.ServiceEntity;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServiceRepository extends JpaRepository<ServiceEntity, UUID> {

    List<ServiceEntity> findAllByCategoryIgnoreCase(String category);
}
