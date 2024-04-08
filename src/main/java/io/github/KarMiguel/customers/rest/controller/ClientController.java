package io.github.KarMiguel.customers.rest.controller;

import io.github.KarMiguel.customers.model.entity.Client;
import io.github.KarMiguel.customers.model.entity.Users;
import io.github.KarMiguel.customers.model.repository.ClientRepository;
import io.github.KarMiguel.customers.model.repository.UserRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("api/client/")
@RequiredArgsConstructor
public class ClientController {

    private final ClientRepository repository;

    private final UserRepository userRepository;


    @PostMapping
    public ResponseEntity<Client> save(@RequestBody @Valid Client client, Authentication authentication) {
        String username = authentication.getName();

        Users user = (Users ) userRepository.findByUsername(username);
        client.setUsers(user);
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
    public ResponseEntity<List<Client>> listAll(Authentication authentication) {
        // Obtém o nome de usuário do usuário logado
        String username = authentication.getName();

        // Busca o usuário pelo nome de usuário
        Users user = (Users ) userRepository.findByUsername(username);

        // Obtém a lista de clientes associados ao usuário logado
        List<Client> clients = repository.findClientByUsers(user);

        return ResponseEntity.ok(clients);
    }
}
