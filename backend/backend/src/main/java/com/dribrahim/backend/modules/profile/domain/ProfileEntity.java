package com.dribrahim.backend.modules.profile.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Entity
@Table(name = "profiles")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProfileEntity {

    @Id
    @JsonIgnore
    @Column(name = "id", nullable = false, length = 64)
    private String id;

    @Valid
    @NotNull
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "bio", nullable = false, columnDefinition = "jsonb")
    private LocalizedProfileText bio;

    @Valid
    @NotEmpty
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "education", nullable = false, columnDefinition = "jsonb")
    private List<ProfileEducationItem> education;

    @Valid
    @NotNull
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "achievements", nullable = false, columnDefinition = "jsonb")
    private LocalizedAchievementList achievements;
}
