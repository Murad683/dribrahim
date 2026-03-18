package com.dribrahim.backend.modules.profile.domain;

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
public class ProfileEducationTranslations {

    @Valid
    @NotNull
    private LocalizedProfileEducationContent az;

    @Valid
    @NotNull
    private LocalizedProfileEducationContent ru;

    @Valid
    @NotNull
    private LocalizedProfileEducationContent en;
}
