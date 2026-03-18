package com.dribrahim.backend.modules.cases.domain;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CaseTranslations {

    @Valid
    @NotNull
    private LocalizedCaseContent az;

    @Valid
    @NotNull
    private LocalizedCaseContent ru;

    @Valid
    @NotNull
    private LocalizedCaseContent en;
}
