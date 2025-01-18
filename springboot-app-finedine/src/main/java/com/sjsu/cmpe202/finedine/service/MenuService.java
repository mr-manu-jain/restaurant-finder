package com.sjsu.cmpe202.finedine.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import com.sjsu.cmpe202.finedine.entity.MenuItem;
import com.sjsu.cmpe202.finedine.repository.MenuItemRepository;
import com.sjsu.cmpe202.finedine.models.request.CreateMenuRequest;

@Service
public class MenuService {

    @Autowired
    private MenuItemRepository menuItemRepository;
    
    public boolean createMenuItem(CreateMenuRequest request) {
        try {
            validateMenuRequest(request);
            
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
            
            MenuItem savedItem = menuItemRepository.save(menuItem);
            return savedItem != null;
            
        } catch (ResponseStatusException e) {
            throw e;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    private void validateMenuRequest(CreateMenuRequest request) {
        if (request.getRestaurantId() == null || request.getRestaurantId().trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Restaurant ID is required");
        }
        
        if (request.getTitle() == null || request.getTitle().trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Title is required");
        }

        if (request.getPrice() <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Price must be greater than 0");
        }

        if (request.getType() == null || !isValidType(request.getType())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid menu item type. Must be v, nv, or vegan");
        }
    }

    private boolean isValidType(String type) {
        return type.equals("v") || type.equals("nv") || type.equals("vegan");
    }
}