package com.dribrahim.backend.modules.cases.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Entity
@Table(name = "cases")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Lob
    @NotBlank
    @Column(name = "image", nullable = false, columnDefinition = "text")
    private String image;

    @NotBlank
    @Column(name = "stat", nullable = false, length = 50)
    private String stat;

    @Valid
    @NotNull
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "translations", nullable = false, columnDefinition = "jsonb")
    private CaseTranslations locales;
}
