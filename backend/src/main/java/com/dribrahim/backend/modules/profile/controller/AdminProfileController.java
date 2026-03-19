package com.dribrahim.backend.modules.profile.controller;

import com.dribrahim.backend.modules.profile.domain.ProfileEntity;
import com.dribrahim.backend.modules.profile.service.ProfileAdminService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin/profile")
public class AdminProfileController {

    private final ProfileAdminService profileAdminService;

    @GetMapping
    public ProfileEntity getProfile() {
        return profileAdminService.getProfile();
    }

    @PostMapping
    public ProfileEntity saveProfile(@Valid @RequestBody ProfileEntity request) {
        return profileAdminService.save(request);
    }
}
