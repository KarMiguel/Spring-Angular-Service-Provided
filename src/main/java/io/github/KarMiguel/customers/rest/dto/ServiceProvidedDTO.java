package io.github.KarMiguel.customers.rest.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


public  record ServiceProvidedDTO(
    @NotEmpty(message = "{campo.description.obrigatorio}")
    String description,
    @NotEmpty(message = "{campo.price.obrigatorio}")
    String price,
    @NotEmpty(message = "{campo.date.obrigatorio}")
    String date,
    @NotNull(message = "{campo.client.obrigatorio}")
    Integer idClient
){
}
