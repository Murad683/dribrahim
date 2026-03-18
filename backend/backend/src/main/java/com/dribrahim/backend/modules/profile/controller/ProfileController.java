package com.dribrahim.backend.modules.profile.controller;

import com.dribrahim.backend.modules.profile.domain.ProfileEntity;
import com.dribrahim.backend.modules.profile.service.ProfileAdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/profile")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
public class ProfileController {

    private final ProfileAdminService profileAdminService;

    @GetMapping
    public ProfileEntity getProfile() {
        return profileAdminService.getProfile();
    }
}
