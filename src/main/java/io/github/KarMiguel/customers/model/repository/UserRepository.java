package io.github.KarMiguel.customers.model.repository;

import io.github.KarMiguel.customers.model.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;

public interface UserRepository extends JpaRepository<Users,Integer> {
    UserDetails findByUsername(String username);

    boolean existsByUsername(String login);
}
