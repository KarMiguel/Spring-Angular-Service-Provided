package io.github.KarMiguel.customers.model.repository;

import io.github.KarMiguel.customers.model.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<Users,Integer> {

}
