package com.sjsu.cmpe202.finedine.models.request;

import java.time.LocalTime;
import java.util.List;

public class UpdateRestaurantRequest {
    private String id;
    private String restaurantName;
    private String description;
    private String ownerId;
    private String address;
    private String city;
    private String state;
    private String country;
    private String zipCode;
    private String phoneNumber;
    private String openingTime;
    private String closingTime;
    private Boolean reservation;
    private Double averagePrice;
    private Boolean franchise;
    private List<String> cuisines;
    private List<String> foodTypes;
    private String imageUrl;

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getRestaurantName() {
        return this.restaurantName;
    }

    public void setRestaurantName(String restaurantName) {
        this.restaurantName = restaurantName;
    }

    public String getOwnerId() {
        return this.ownerId;
    }

    public void setOwnerId(String ownerId) {
        this.ownerId = ownerId;
    }

    public String getAddress() {
        return this.address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return this.city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return this.state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getCountry() {
        return this.country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getZipCode() {
        return this.zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public String getPhoneNumber() {
        return this.phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getOpeningTime() {
        return this.openingTime;
    }

    public void setOpeningTime(String openingTime) {
        this.openingTime = openingTime;
    }

    public String getClosingTime() {
        return this.closingTime;
    }

    public void setClosingTime(String closingTime) {
        this.closingTime = closingTime;
    }

    public Boolean isReservation() {
        return this.reservation;
    }

    public Boolean getReservation() {
        return this.reservation;
    }

    public void setReservation(Boolean reservation) {
        this.reservation = reservation;
    }

    public Double getAveragePrice() {
        return this.averagePrice;
    }

    public void setAveragePrice(Double averagePrice) {
        this.averagePrice = averagePrice;
    }

    public Boolean isFranchise() {
        return this.franchise;
    }

    public Boolean getFranchise() {
        return this.franchise;
    }

    public void setFranchise(Boolean franchise) {
        this.franchise = franchise;
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

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
}
