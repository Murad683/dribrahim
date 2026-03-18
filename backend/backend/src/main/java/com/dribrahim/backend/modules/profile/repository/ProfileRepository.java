package com.dribrahim.backend.modules.profile.repository;

import com.dribrahim.backend.modules.profile.domain.ProfileEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfileRepository extends JpaRepository<ProfileEntity, String> {
}
