package io.github.KarMiguel.customers.model.entity;


import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;

@Entity
@Data
public class Service {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(nullable = false,length = 255)
    private String description;
    @ManyToOne
    @JoinColumn(name = "id_client")
    private Client client;
    @Column
    private BigDecimal value;


}
