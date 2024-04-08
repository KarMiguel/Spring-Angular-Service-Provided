package io.github.KarMiguel.customers.service;

import io.github.KarMiguel.customers.model.entity.Client;
import io.github.KarMiguel.customers.model.repository.ClientRepository;
import io.github.KarMiguel.customers.model.repository.ServiceProvidedRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ClientService {


    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private ServiceProvidedRepository serviceProvidedRepository;

    @Transactional
    public void deleteClient(Integer clientId) {
        Client client = clientRepository.findById(clientId)
                .orElseThrow(() -> new EntityNotFoundException("Client not found with id: " + clientId));

        // Exclui todos os serviços prestados pelo cliente
        serviceProvidedRepository.deleteByClient(client);

        // Exclui o cliente
        clientRepository.delete(client);
    }
}
