package io.github.KarMiguel.customers.model.entity;


import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.br.CPF;

import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false,length = 150,unique = true)
    @NotEmpty(message = "{campo.nome.obrigatorio}")
    private String name;

    @Column(nullable = false,length = 11)
    @NotNull(message = "{campo.phone.obrigatorio}")
    private String phone;

    @Column(nullable = false,length = 11)
    @NotNull(message = "{campo.cpf.obrigatorio}")
    @CPF(message = "{campo.cpf.inválido}")
    private String cpf;

    @Column(name = "email_client",nullable = false,length = 50)
    @NotNull(message = "{campo.email.obrigatorio}")
    @Email( regexp = "^[a-z0-9.+-]+@[a-z0-9.-]+\\.[a-z]{2,}$",message = "{campo.email.inválido}")
    private String emailClient;

    @Column(name = "data_register",updatable = false)
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate dateRegister;

    @ManyToOne
    @JoinColumn(name = "id_user")
    private Users users;


    @PrePersist
    public  void prePersist(){
        setDateRegister(LocalDate.now());
    }

}
