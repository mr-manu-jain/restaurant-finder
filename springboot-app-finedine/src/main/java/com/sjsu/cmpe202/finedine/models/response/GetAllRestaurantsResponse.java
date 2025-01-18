package com.sjsu.cmpe202.finedine.models.response;

import com.sjsu.cmpe202.finedine.entity.Restaurant;

import java.util.List;

public class GetAllRestaurantsResponse {
    private List<Restaurant> restaurants;
    private int total;

    public List<Restaurant> getRestaurants() {
        return restaurants;
    }

    public void setRestaurants(List<Restaurant> restaurants) {
        this.restaurants = restaurants;
    }
    public int getTotal() {
        return total;
    }
    public void setTotal(int total) {
        this.total = total;
    }
}
