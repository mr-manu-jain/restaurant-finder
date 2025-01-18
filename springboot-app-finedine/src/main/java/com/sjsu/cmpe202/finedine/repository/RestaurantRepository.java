package com.sjsu.cmpe202.finedine.repository;

import com.sjsu.cmpe202.finedine.entity.Restaurant;
import com.sjsu.cmpe202.finedine.models.request.GetRestaurantDetailsRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.core.query.Query;

import java.util.List;

public interface RestaurantRepository extends MongoRepository<Restaurant,String>, RestaurantTableQueries {
    List<Restaurant> findByOwnerId(String ownerId);
    Restaurant getRestaurantById(String restaurantId);
    List<Restaurant> getRestaurantByZipCode(String zipCode);
}
