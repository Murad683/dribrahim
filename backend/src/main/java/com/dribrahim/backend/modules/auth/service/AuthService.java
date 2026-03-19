package com.dribrahim.backend.modules.auth.service;

import com.dribrahim.backend.modules.auth.dto.AuthLoginRequest;
import com.dribrahim.backend.modules.auth.dto.AuthLoginResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class AuthService {

    @Value("${app.security.admin.username}")
    private String configuredUsername;

    @Value("${app.security.admin.password}")
    private String configuredPassword;

    private final JwtUtils jwtUtils;

    public AuthLoginResponse login(AuthLoginRequest request) {
        if (!configuredUsername.equals(request.username()) || !configuredPassword.equals(request.password())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials");
        }

        return new AuthLoginResponse(jwtUtils.generateToken(request.username()), request.username());
    }
}
