package com.sjsu.cmpe202.finedine.repository;

import com.sjsu.cmpe202.finedine.entity.Restaurant;
import com.sjsu.cmpe202.finedine.models.request.GetRestaurantDetailsRequest;

import java.util.List;

public interface RestaurantTableQueries {
    public List<Restaurant> findRestaurantByNameCuisinesFoodTypesPriceRating(GetRestaurantDetailsRequest req);
}
