package com.sjsu.cmpe202.finedine.models.response;

import com.sjsu.cmpe202.finedine.entity.Restaurant;

public class GetRestaurantResponse {
    private Restaurant restaurant;

    public Restaurant getRestaurant() {
        return restaurant;
    }

    public void setRestaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
    }
}
