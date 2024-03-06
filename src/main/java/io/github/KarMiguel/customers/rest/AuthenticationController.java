package io.github.KarMiguel.customers.rest;

import io.github.KarMiguel.customers.infra.security.TokenServices;
import io.github.KarMiguel.customers.model.entity.Users;
import io.github.KarMiguel.customers.model.repository.UserRepository;
import io.github.KarMiguel.customers.rest.dto.AuthenticationDTO;
import io.github.KarMiguel.customers.rest.dto.LoginResponseDTO;
import io.github.KarMiguel.customers.rest.dto.RegisterDTO;
import io.github.KarMiguel.customers.rest.exception.UserRegisterException;
import io.github.KarMiguel.customers.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import javax.naming.AuthenticationException;

@RestController
@RequestMapping("api/auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private TokenServices tokenService;

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody @Valid RegisterDTO user) throws ResponseStatusException {

        String encryptedPassword = new BCryptPasswordEncoder().encode(user.password());
        Users newUser = new Users(user.username(), encryptedPassword, user.name());

        try {
            userService.registerUser(newUser);
            return ResponseEntity.ok().build();
        } catch (UserRegisterException e) {
            throw  new ResponseStatusException(HttpStatus.BAD_REQUEST,e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid AuthenticationDTO login) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(login.username(), login.password());

        var auth = this.authenticationManager.authenticate(usernamePassword);

        var token = tokenService.generateToken((Users) auth.getPrincipal());
        return ResponseEntity.ok(new LoginResponseDTO(token));
    }
}
