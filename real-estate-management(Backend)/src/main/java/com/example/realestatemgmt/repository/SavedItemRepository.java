package com.example.realestatemgmt.repository;

import com.example.realestatemgmt.model.SavedItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SavedItemRepository extends JpaRepository<SavedItem, Long> {
    List<SavedItem> findByClientId(Long clientId);
}
