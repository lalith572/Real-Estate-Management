package com.example.realestatemgmt.controller;
import com.example.realestatemgmt.model.Property;
import com.example.realestatemgmt.service.PropertyService;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/properties")
public class PropertyController {

    @Autowired
    private PropertyService propertyService;
    @Autowired
    private ObjectMapper objectMapper;
@PostMapping("/add")
public ResponseEntity<String> addProperty(
        @RequestParam("propertyJson") String propertyJson,
        @RequestParam("image") MultipartFile image) {
    try {
        ObjectMapper objectMapper = new ObjectMapper();
        Property property = objectMapper.readValue(propertyJson, Property.class);
        if (image != null && !image.isEmpty()) {
            property.setImage(image.getBytes());
        } else {
            return ResponseEntity.badRequest().body("Image file is required.");
        }
        propertyService.saveProperty(property);
        return ResponseEntity.ok("Property added successfully.");
    } catch (IOException e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing request.");
    }
}
    @PutMapping("/update/{id}")
    public ResponseEntity<Property> updateProperty(
            @PathVariable Long id,
            @RequestParam("propertyJson") String propertyJson,
            @RequestParam(value = "image", required = false) MultipartFile image) {
        try {
            Property propertyDetails = objectMapper.readValue(propertyJson, Property.class);
            Property updatedProperty = propertyService.updateProperty(id, propertyDetails);
            if (image != null && !image.isEmpty()) {
                propertyService.saveImage(updatedProperty.getId(), image);
            }
            return ResponseEntity.ok(updatedProperty);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Property> getPropertyById(@PathVariable Long id) {
        return propertyService.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<List<Property>> getPropertiesByType(@PathVariable String type) {
        List<Property> properties = propertyService.findByType(type);
        return ResponseEntity.ok(properties);
    }

    @GetMapping("/all")
    public List<Property> getAllProperties() {
        return propertyService.findAllProperties();
    }

    @GetMapping("/test")
    public ResponseEntity<String> testEndpoint() {
        return ResponseEntity.ok("Test endpoint is working!");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteProperty(@PathVariable Long id) {
        try {
            propertyService.deleteProperty(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/upload/{id}")
    public ResponseEntity<String> uploadImage(@PathVariable("id") Long propertyId, @RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("File is missing");
        }
        if (propertyId == null) {
            return ResponseEntity.badRequest().body("Property ID is missing");
        }
        try {
            propertyService.saveImage(propertyId, file);
            return ResponseEntity.ok("Image uploaded successfully");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Image upload failed: " + e.getMessage());
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PostMapping("/test-upload/{id}")
    public ResponseEntity<String> testUpload(@PathVariable("id") Long propertyId, @RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok("Received file for property id: " + propertyId);
    }

    @GetMapping("/search")
    public List<Property> searchProperties(@RequestParam String type, @RequestParam String query) {
        return propertyService.searchProperties(type, query);
    }
}
