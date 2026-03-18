package com.dribrahim.backend.modules.profile.domain;

import jakarta.validation.constraints.NotBlank;
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
public class LocalizedProfileEducationContent {

    @NotBlank
    private String title;

    @NotBlank
    private String description;
}
