package com.dribrahim.backend.modules.cases.service;

import com.dribrahim.backend.modules.cases.domain.CaseEntity;
import com.dribrahim.backend.modules.cases.repository.CaseRepository;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class CaseAdminService {

    private final CaseRepository caseRepository;

    @Transactional(readOnly = true)
    public List<CaseEntity> findAll() {
        return caseRepository.findAll();
    }

    @Transactional
    public CaseEntity create(CaseEntity request) {
        request.setId(null);
        return caseRepository.save(request);
    }

    @Transactional
    public CaseEntity update(UUID id, CaseEntity request) {
        CaseEntity existing = caseRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Case not found"));

        existing.setImage(request.getImage());
        existing.setStat(request.getStat());
        existing.setLocales(request.getLocales());
        return caseRepository.save(existing);
    }

    @Transactional
    public void delete(UUID id) {
        if (!caseRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Case not found");
        }

        caseRepository.deleteById(id);
    }
}
