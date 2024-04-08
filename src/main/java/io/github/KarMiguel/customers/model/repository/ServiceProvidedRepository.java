package io.github.KarMiguel.customers.model.repository;

import io.github.KarMiguel.customers.model.entity.Client;
import io.github.KarMiguel.customers.model.entity.ServiceProvided;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceProvidedRepository extends JpaRepository<ServiceProvided,Integer> {

    @Query("select s from ServiceProvided s join s.client c " +
            "where upper(trim(c.name)) like upper(trim(concat('%', :name, '%'))) and " +
            "MONTH(s.date) = :mes")
    List<ServiceProvided> findByNameAndMes(@Param("name") String name, @Param("mes") Integer mes);


    List<ServiceProvided> findByClient(Client client);

    @Query("select s from ServiceProvided s join s.client c " +
            "join c.users u " +
            "where upper(trim(c.name)) like upper(trim(concat('%', :name, '%'))) and " +
            "MONTH(s.date) = :mes and " +
            "u.username = :username")
    List<ServiceProvided> findByNameAndMesAndClient(
            @Param("name") String name,
            @Param("mes") Integer mes,
            @Param("username") String username);
}
