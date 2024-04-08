package io.github.KarMiguel.customers.rest.controller;

import io.github.KarMiguel.customers.model.entity.Client;
import io.github.KarMiguel.customers.model.entity.ServiceProvided;
import io.github.KarMiguel.customers.model.repository.ClientRepository;
import io.github.KarMiguel.customers.model.repository.ServiceProvidedRepository;
import io.github.KarMiguel.customers.model.repository.UserRepository;
import io.github.KarMiguel.customers.rest.dto.ServiceProvidedDTO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("api/service-provided")
@RequiredArgsConstructor
public class ServiceProvidedController {

    @Autowired
    private  ClientRepository clientRepository;
    @Autowired
    private ServiceProvidedRepository serviceProvidedReposity;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public ResponseEntity<ServiceProvided> saveServiceProvided(@RequestBody @Valid ServiceProvidedDTO dto) {
        LocalDate data = LocalDate.parse(dto.date(), DateTimeFormatter.ofPattern("dd/MM/yyyy"));

        Integer idClient = dto.idClient();

        Client client =
                clientRepository
                        .findById(idClient)
                        .orElseThrow(()-> new ResponseStatusException(
                                HttpStatus.BAD_REQUEST,"Customer does not exist"
                        ));

        ServiceProvided serviceProvided = new ServiceProvided();
        serviceProvided.setDescription(dto.description());
        serviceProvided.setDate(data);
        serviceProvided.setClient(client);
        serviceProvided.setValue(BigDecimal.valueOf(Double.parseDouble(dto.price().replace(",", "."))));

        serviceProvidedReposity.save(serviceProvided);

        return new ResponseEntity<>(serviceProvided, HttpStatus.CREATED);
    }

    @GetMapping("/list")
    public ResponseEntity<List<ServiceProvided>> list(Authentication authentication) {
        String username = authentication.getName();

        Client client = clientRepository.findByUsersUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado."));

        List<ServiceProvided> service = serviceProvidedReposity.findByClient(client);

        return ResponseEntity.ok(service);

    }
    @GetMapping
    private ResponseEntity<List<ServiceProvided>> search(
            @RequestParam(required = false,defaultValue = "") String name,
            @RequestParam(required = false) Integer month,
            Authentication authentication
    ){

        String username = authentication.getName();

        Client client = clientRepository.findByUsersUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado."));

        List<ServiceProvided> service = serviceProvidedReposity.findByNameAndMesAndClient(name,month, username);

        return ResponseEntity.ok(service);

    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteById(@PathVariable Integer id) {
        ServiceProvided service = serviceProvidedReposity.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Serviço Prestado não encontrado."));
        serviceProvidedReposity.delete(service);
        return ResponseEntity.noContent().build() ;
    }

}
