package com.dribrahim.backend.modules.cases.controller;

import com.dribrahim.backend.modules.cases.domain.CaseEntity;
import com.dribrahim.backend.modules.cases.service.CaseAdminService;
import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
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
@RequestMapping("/api/admin/cases")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
public class AdminCaseController {

    private final CaseAdminService caseAdminService;

    @GetMapping
    public List<CaseEntity> getCases() {
        return caseAdminService.findAll();
    }

    @PostMapping
    public CaseEntity createCase(@Valid @RequestBody CaseEntity request) {
        return caseAdminService.create(request);
    }

    @PutMapping("/{id}")
    public CaseEntity updateCase(@PathVariable UUID id, @Valid @RequestBody CaseEntity request) {
        return caseAdminService.update(id, request);
    }

    @DeleteMapping("/{id}")
    public void deleteCase(@PathVariable UUID id) {
        caseAdminService.delete(id);
    }
}
