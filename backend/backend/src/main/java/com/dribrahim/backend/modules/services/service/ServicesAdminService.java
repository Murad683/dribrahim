package com.dribrahim.backend.modules.services.service;

import com.dribrahim.backend.modules.services.domain.ServiceEntity;
import com.dribrahim.backend.modules.services.repository.ServiceRepository;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class ServicesAdminService {

    private final ServiceRepository serviceRepository;

    @Transactional(readOnly = true)
    public List<ServiceEntity> findAll() {
        return serviceRepository.findAll();
    }

    @Transactional
    public ServiceEntity create(ServiceEntity request) {
        request.setId(null);
        return serviceRepository.save(request);
    }

    @Transactional
    public ServiceEntity update(UUID id, ServiceEntity request) {
        ServiceEntity existing = serviceRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Service not found"));

        existing.setIcon(request.getIcon());
        existing.setCategory(request.getCategory());
        existing.setLocales(request.getLocales());
        return serviceRepository.save(existing);
    }

    @Transactional
    public void delete(UUID id) {
        if (!serviceRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Service not found");
        }

        serviceRepository.deleteById(id);
    }
}
