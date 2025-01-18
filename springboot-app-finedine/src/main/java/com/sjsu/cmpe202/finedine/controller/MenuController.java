package com.sjsu.cmpe202.finedine.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.sjsu.cmpe202.finedine.entity.MenuItem;
import com.sjsu.cmpe202.finedine.repository.MenuItemRepository;
import com.sjsu.cmpe202.finedine.models.request.CreateMenuRequest;

import com.sjsu.cmpe202.finedine.models.request.DeleteMenuRequest;
import com.sjsu.cmpe202.finedine.models.request.GetMenuDetailsRequest;
import com.sjsu.cmpe202.finedine.models.response.GetMenuDetailsResponse;
import com.sjsu.cmpe202.finedine.models.request.UpdateMenuRequest;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/menu")
public class MenuController {

    @Autowired
    private MenuItemRepository menuItemRepository;

    @PostMapping("/create")
    public ResponseEntity<?> createMenuItem(@RequestBody CreateMenuRequest request) {
        try {
            MenuItem menuItem = new MenuItem();
            menuItem.setRestaurantId(request.getRestaurantId());
            menuItem.setTitle(request.getTitle());
            menuItem.setDescription(request.getDescription());
            menuItem.setPrice(request.getPrice());
            menuItem.setType(request.getType());
            menuItem.setStock(request.getStock());
            menuItem.setQuantity(request.getQuantity());
            menuItem.setCategory(request.getCategory());
            menuItem.setCreatedAt(System.currentTimeMillis());

            // Save to database
            MenuItem savedItem = menuItemRepository.save(menuItem);

            // Create response
            Map<String, Boolean> response = new HashMap<>();
            response.put("menuAdded", savedItem != null);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Boolean> response = new HashMap<>();
            response.put("menuAdded", false);
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @PostMapping("/deleteMenu")
    public ResponseEntity<?> deleteMenu(@RequestBody DeleteMenuRequest request) {
        try {
            menuItemRepository.deleteById(request.getMenuId());
            Map<String, Boolean> response = new HashMap<>();
            response.put("isDeleted", true);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Boolean> response = new HashMap<>();
            response.put("isDeleted", false);
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @PostMapping("/getMenuDetails")
    public ResponseEntity<GetMenuDetailsResponse> getMenuDetails(@RequestBody GetMenuDetailsRequest request) {
        try {
            List<MenuItem> menuItems = menuItemRepository.findByRestaurantId(request.getRestaurantId());
            GetMenuDetailsResponse response = new GetMenuDetailsResponse(menuItems);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/update")
    public ResponseEntity<?> updateMenuItem(@RequestBody UpdateMenuRequest request) {
        try {
            MenuItem existingMenuItem = menuItemRepository
                .findByRestaurantIdAndTitle(request.getRestaurantId(), request.getTitle())
                .orElseThrow(() -> new RuntimeException("Menu item not found"));

            // Update the existing menu item
            existingMenuItem.setDescription(request.getDescription());
            existingMenuItem.setPrice(request.getPrice());
            existingMenuItem.setType(request.getType());
            existingMenuItem.setStock(request.getStock());
            existingMenuItem.setQuantity(request.getQuantity());
            existingMenuItem.setCategory(request.getCategory());

            // Save updated item
            MenuItem updatedItem = menuItemRepository.save(existingMenuItem);

            // Create response
            Map<String, Boolean> response = new HashMap<>();
            response.put("menuUpdated", updatedItem != null);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Boolean> response = new HashMap<>();
            response.put("menuUpdated", false);
            return ResponseEntity.badRequest().body(response);
        }
    }
}