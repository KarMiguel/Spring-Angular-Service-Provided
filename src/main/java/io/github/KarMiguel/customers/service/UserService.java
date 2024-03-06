package io.github.KarMiguel.customers.service;

import io.github.KarMiguel.customers.model.entity.Users;
import io.github.KarMiguel.customers.model.repository.UserRepository;
import io.github.KarMiguel.customers.rest.exception.UserRegisterException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService {


    @Autowired
    private UserRepository userRepository;

    public  Users registerUser(Users users){
        boolean exists = userRepository.existsByUsername(users.getUsername());
        if (exists){
            throw new UserRegisterException(users.getUsername());
        }
        return userRepository.save(users);
    }

    public  UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {
        return userRepository.findByUsername(name);
    }
}
