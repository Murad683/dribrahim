package com.dribrahim.backend.modules.cases.controller;

import com.dribrahim.backend.modules.cases.domain.CaseEntity;
import com.dribrahim.backend.modules.cases.service.CaseAdminService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/cases")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
public class CaseController {

    private final CaseAdminService caseAdminService;

    @GetMapping
    public List<CaseEntity> getCases() {
        return caseAdminService.findAll();
    }
}
