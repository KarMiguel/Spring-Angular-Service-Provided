package io.github.KarMiguel.customers.rest;

import io.github.KarMiguel.customers.model.entity.Client;
import io.github.KarMiguel.customers.model.entity.Users;
import io.github.KarMiguel.customers.model.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/user")
public class UsersController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public ResponseEntity<Users> saveLogin(@RequestBody @Valid Users user) {
        Users users = userRepository.save(user);
        return  ResponseEntity.ok(users);
    }

}
