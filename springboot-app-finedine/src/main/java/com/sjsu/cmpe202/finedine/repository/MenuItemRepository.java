package com.sjsu.cmpe202.finedine.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.sjsu.cmpe202.finedine.entity.MenuItem;

import java.util.List;
import java.util.Optional;

@Repository
public interface MenuItemRepository extends MongoRepository<MenuItem, String> {
    // Find all menu items for a specific restaurant
    List<MenuItem> findByRestaurantId(String restaurantId);
    
    // Find menu items by category
    List<MenuItem> findByRestaurantIdAndCategory(String restaurantId, String category);
    
    // Find menu items by type
    List<MenuItem> findByRestaurantIdAndType(String restaurantId, String type);
    
    // Find menu items in stock
    List<MenuItem> findByRestaurantIdAndStockTrue(String restaurantId);
    
    // Find menu items by price range
    List<MenuItem> findByRestaurantIdAndPriceBetween(String restaurantId, Double minPrice, Double maxPrice);
    
    // Check if menu item exists
    Optional<MenuItem> findByRestaurantIdAndTitle(String restaurantId, String title);
}