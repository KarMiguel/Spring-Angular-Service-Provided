package io.github.KarMiguel.customers.rest;

import io.github.KarMiguel.customers.model.entity.Client;
import io.github.KarMiguel.customers.model.repository.ClientRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("api/client")
@CrossOrigin("http://localhost:4200")
public class ClientController {

    private final ClientRepository repository;

    @Autowired
    public ClientController(ClientRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public ResponseEntity<Client> save(@RequestBody @Valid Client client) {
        Client savedClient = repository.save(client);
        return new ResponseEntity<>(savedClient, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<Client> seacherById(@PathVariable Integer id) {
        Client client = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado."));
        return ResponseEntity.ok(client);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteById(@PathVariable Integer id) {
        repository.findById(id)
                .map(client -> {
                    repository.delete(client);
                    return ResponseEntity.noContent().build();
                })
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado."));
        return null;
    }

    @PutMapping("{id}")
    public ResponseEntity<?> update(@PathVariable Integer id, @RequestBody @Valid Client clientUpdate) {
        return  repository.findById(id)
                .map(client -> {
                    clientUpdate.setId(client.getId());
                    repository.save(clientUpdate);
                    return ResponseEntity.noContent().build();
                })
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado."));

    }


    @GetMapping
    public ResponseEntity<List<Client>> listAll() {
        List<Client> clients = repository.findAll();
        return ResponseEntity.ok(clients);
    }
}
