package io.github.KarMiguel.customers.model.repository;

import io.github.KarMiguel.customers.model.entity.Client;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository extends JpaRepository<Client,Integer> {

}
