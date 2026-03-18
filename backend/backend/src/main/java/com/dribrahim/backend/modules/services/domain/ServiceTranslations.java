package com.dribrahim.backend.modules.services.domain;

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
public class ServiceTranslations {

    @Valid
    @NotNull
    private LocalizedServiceContent az;

    @Valid
    @NotNull
    private LocalizedServiceContent ru;

    @Valid
    @NotNull
    private LocalizedServiceContent en;
}
