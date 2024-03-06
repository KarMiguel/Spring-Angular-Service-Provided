package io.github.KarMiguel.customers.rest.dto;

import jakarta.validation.constraints.NotEmpty;

public record RegisterDTO(
        @NotEmpty(message = "{campo.login.obrigatorio}")
        String username,
        @NotEmpty(message = "{campo.password.obrigatorio}")
        String password,
        @NotEmpty(message = "{campo.name.login.obrigatorio}")
        String name) {
}
