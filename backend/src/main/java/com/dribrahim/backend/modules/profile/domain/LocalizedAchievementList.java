package com.dribrahim.backend.modules.profile.domain;

import jakarta.validation.constraints.NotNull;
import java.util.List;
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
public class LocalizedAchievementList {

    @NotNull
    private List<@NotBlank String> az;

    @NotNull
    private List<@NotBlank String> ru;

    @NotNull
    private List<@NotBlank String> en;
}
