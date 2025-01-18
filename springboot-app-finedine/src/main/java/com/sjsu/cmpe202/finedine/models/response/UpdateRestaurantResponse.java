package com.sjsu.cmpe202.finedine.models.response;

public class UpdateRestaurantResponse {
    private boolean restaurantUpdated;

    public boolean isRestaurantUpdated() {
        return this.restaurantUpdated;
    }

    public boolean getRestaurantUpdated() {
        return this.restaurantUpdated;
    }

    public void setRestaurantUpdated(boolean restaurantUpdated) {
        this.restaurantUpdated = restaurantUpdated;
    }
}
