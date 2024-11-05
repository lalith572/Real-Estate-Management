package com.example.realestatemgmt.repository;

import com.example.realestatemgmt.model.PurchaseHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PurchaseHistoryRepository extends JpaRepository<PurchaseHistory, Long> {
    static Long findByClientId(Long clientId) {
        return clientId;
    }
}
