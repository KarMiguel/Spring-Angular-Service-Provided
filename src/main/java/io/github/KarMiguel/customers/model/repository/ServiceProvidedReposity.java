package io.github.KarMiguel.customers.model.repository;

import io.github.KarMiguel.customers.model.entity.ServiceProvided;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceProvidedReposity extends JpaRepository<ServiceProvided,Integer> {

    @Query("select s from ServiceProvided s join s.client c " +
            "where upper(trim(c.name)) like upper(trim(concat('%', :name, '%'))) and " +
            "MONTH(s.date) = :mes")
    List<ServiceProvided> findByNameAndMes(@Param("name") String name, @Param("mes") Integer mes);


}
