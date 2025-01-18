package com.sjsu.cmpe202.finedine.models.response;

// This class is for getting the results from Google Places API.
public class RestaurantsZipCode {
    private String name;
    private String address;
    private Double rating;

    public RestaurantsZipCode(String name, String address, Double rating) {
        this.name = name;
        this.address = address;
        this.rating = rating;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }
}
