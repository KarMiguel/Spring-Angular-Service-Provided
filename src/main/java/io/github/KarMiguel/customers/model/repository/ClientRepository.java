package io.github.KarMiguel.customers.model.repository;

import io.github.KarMiguel.customers.model.entity.Client;
import io.github.KarMiguel.customers.model.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ClientRepository extends JpaRepository<Client,Integer> {

    List<Client> findClientByUsers(Users user);

    Optional<Client> findByUsersUsername(String username);
}
