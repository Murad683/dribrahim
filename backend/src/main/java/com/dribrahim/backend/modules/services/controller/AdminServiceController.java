package com.dribrahim.backend.modules.services.controller;

import com.dribrahim.backend.modules.services.domain.ServiceEntity;
import com.dribrahim.backend.modules.services.service.ServicesAdminService;
import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin/services")
public class AdminServiceController {

    private final ServicesAdminService servicesAdminService;

    @GetMapping
    public List<ServiceEntity> getServices() {
        return servicesAdminService.findAll();
    }

    @PostMapping
    public ServiceEntity createService(@Valid @RequestBody ServiceEntity request) {
        return servicesAdminService.create(request);
    }

    @PutMapping("/{id}")
    public ServiceEntity updateService(@PathVariable UUID id, @Valid @RequestBody ServiceEntity request) {
        return servicesAdminService.update(id, request);
    }

    @DeleteMapping("/{id}")
    public void deleteService(@PathVariable UUID id) {
        servicesAdminService.delete(id);
    }
}
