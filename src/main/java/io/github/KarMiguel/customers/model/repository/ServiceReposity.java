package io.github.KarMiguel.customers.model.repository;

import io.github.KarMiguel.customers.model.entity.Service;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServiceReposity extends JpaRepository<Service,Integer> {

}
