package com.sjsu.cmpe202.finedine.models.request;

import java.util.List;

public class GetRestaurantDetailsRequest {
    private String restaurantName;
    private List<String> cuisines;
    private List<String> foodTypes;
    private Double price;
    private String priceParameter;
    private Double rating;
    private String ratingParameter;

    public String getRestaurantName() {
        return restaurantName;
    }

    public void setRestaurantName(String restaurantName) {
        this.restaurantName = restaurantName;
    }

    public List<String> getCuisines() {
        return cuisines;
    }

    public void setCuisines(List<String> cuisines) {
        this.cuisines = cuisines;
    }

    public List<String> getFoodTypes() {
        return foodTypes;
    }

    public void setFoodTypes(List<String> foodTypes) {
        this.foodTypes = foodTypes;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getPriceParameter() {
        return priceParameter;
    }

    public void setPriceParameter(String priceParameter) {
        this.priceParameter = priceParameter;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public String getRatingParameter() {
        return ratingParameter;
    }

    public void setRatingParameter(String ratingParameter) {
        this.ratingParameter = ratingParameter;
    }
}
