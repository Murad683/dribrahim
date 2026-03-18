package com.dribrahim.backend.modules.services.controller;

import com.dribrahim.backend.modules.services.domain.ServiceEntity;
import com.dribrahim.backend.modules.services.service.ServicesAdminService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/services")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
public class ServiceController {

    private final ServicesAdminService servicesAdminService;

    @GetMapping
    public List<ServiceEntity> getServices() {
        return servicesAdminService.findAll();
    }
}
