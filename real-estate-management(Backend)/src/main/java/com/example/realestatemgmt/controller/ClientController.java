package com.example.realestatemgmt.controller;

import com.example.realestatemgmt.model.Client;
import com.example.realestatemgmt.model.SavedItem;
import com.example.realestatemgmt.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/clients")
public class ClientController {

    @Autowired
    private ClientService clientService;

    @GetMapping("/{id}")
    public ResponseEntity<Client> getClientProfile(@PathVariable Long id) {
        Client client = clientService.getClientProfile(id);
        return ResponseEntity.ok(client);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Client> updateClientProfile(@PathVariable Long id, @RequestBody Client clientData) {
        Client updatedClient = clientService.updateClientProfile(id, clientData);
        return ResponseEntity.ok(updatedClient);
    }
    @GetMapping("/{id}/purchase-history")
    public ResponseEntity<Long> getPurchaseHistory(@PathVariable Long id) {
        Long purchases = clientService.getPurchaseHistory(id);
        return ResponseEntity.ok(purchases);
    }
    @GetMapping("/{id}/saved-items")
    public ResponseEntity<List<SavedItem>> getSavedItems(@PathVariable Long id) {
        List<SavedItem> savedItems = clientService.getSavedItems(id);
        return ResponseEntity.ok(savedItems);
    }
}
