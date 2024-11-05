package com.example.realestatemgmt.service;

import com.example.realestatemgmt.model.Client;
import com.example.realestatemgmt.model.SavedItem;
import com.example.realestatemgmt.repository.ClientRepository;
import com.example.realestatemgmt.repository.PurchaseHistoryRepository;
import com.example.realestatemgmt.repository.SavedItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientService {

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private PurchaseHistoryRepository purchaseRepository;

    @Autowired
    private SavedItemRepository savedItemRepository;

    public Client getClientProfile(Long id) {
        return clientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Client not found"));
    }
    public Client updateClientProfile(Long id, Client clientData) {
        Client client = clientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Client not found"));

        client.setFirstName(clientData.getFirstName());
        client.setLastName(clientData.getLastName());
        client.setEmail(clientData.getEmail());
        client.setPhoneNumber(clientData.getPhoneNumber());
        client.setAddress(clientData.getAddress());

        return clientRepository.save(client);
    }

    public Long getPurchaseHistory(Long id) {
        return PurchaseHistoryRepository.findByClientId(id);
    }

    public List<SavedItem> getSavedItems(Long id) {
        return savedItemRepository.findByClientId(id);
    }
}
