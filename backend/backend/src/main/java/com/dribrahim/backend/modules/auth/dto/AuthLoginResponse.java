package com.dribrahim.backend.modules.auth.dto;

public record AuthLoginResponse(
    String token,
    String username
) {
}
