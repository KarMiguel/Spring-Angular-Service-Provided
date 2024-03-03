package io.github.KarMiguel.customers.rest;

import io.github.KarMiguel.customers.model.entity.Client;
import io.github.KarMiguel.customers.model.entity.ServiceProvided;
import io.github.KarMiguel.customers.model.repository.ClientRepository;
import io.github.KarMiguel.customers.model.repository.ServiceProvidedReposity;
import io.github.KarMiguel.customers.rest.dto.ServiceProvidedDTO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/service-provided")
@RequiredArgsConstructor
public class ServiceProvidedController {

    @Autowired
    private  ClientRepository clientRepository;
    @Autowired
    private  ServiceProvidedReposity serviceProvidedReposity;


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
    public ResponseEntity<List<ServiceProvided>> list() {
        List<ServiceProvided> service = serviceProvidedReposity.findAll();
        return ResponseEntity.ok(service);
    }
    @GetMapping
    private ResponseEntity<List<ServiceProvided>> search(
            @RequestParam(required = false,defaultValue = "") String name,
            @RequestParam(required = false) Integer month
    ){
        return ResponseEntity.ok(serviceProvidedReposity
                .findByNameAndMes(name.trim().toUpperCase(),month));
    }

}
