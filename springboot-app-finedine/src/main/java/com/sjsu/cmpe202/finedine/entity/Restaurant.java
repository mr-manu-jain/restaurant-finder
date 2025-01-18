package com.sjsu.cmpe202.finedine.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Document(collection = "restaurants")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Restaurant {
    @Id
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
    private boolean reservation;
    private double averagePrice;
    private boolean franchise;
    private List<String> cuisines;
    private List<String> foodTypes;
    private String imageUrl;
    private long createdAt;
    private long updatedAt;

    // Getters
    public String getId() {
        return id;
    }

    public String getRestaurantName() {
        return restaurantName;
    }

    public String getOwnerId() {
        return ownerId;
    }

    public String getAddress() {
        return address;
    }

    public String getCity() {
        return city;
    }

    public String getState() {
        return state;
    }

    public String getCountry() {
        return country;
    }

    public String getZipCode() {
        return zipCode;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public String getOpeningTime() {
        return openingTime;
    }

    public String getClosingTime() {
        return closingTime;
    }

    public boolean isReservation() {
        return reservation;
    }

    public double getAveragePrice() {
        return averagePrice;
    }

    public boolean isFranchise() {
        return franchise;
    }


    public boolean getReservation() {
        return this.reservation;
    }


    public boolean getFranchise() {
        return this.franchise;
    }

    public long getCreatedAt() {
        return this.createdAt;
    }

    public void setCreatedAt(long createdAt) {
        this.createdAt = createdAt;
    }

    // Setters
    public void setId(String id) {
        this.id = id;
    }

    public void setRestaurantName(String restaurantName) {
        this.restaurantName = restaurantName;
    }

    public void setOwnerId(String ownerId) {
        this.ownerId = ownerId;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public void setState(String state) {
        this.state = state;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public void setOpeningTime(String openingTime) {
        this.openingTime = openingTime;
    }

    public void setClosingTime(String closingTime) {
        this.closingTime = closingTime;
    }

    public void setReservation(boolean reservation) {
        this.reservation = reservation;
    }

    public void setAveragePrice(double averagePrice) {
        this.averagePrice = averagePrice;
    }

    public void setFranchise(boolean franchise) {
        this.franchise = franchise;
    }

    public long getUpdatedAt() {
        return this.updatedAt;
    }

    public void setUpdatedAt(long updatedAt) {
        this.updatedAt = updatedAt;
    }

    public List<String> getCuisines() {
        return cuisines;
    }

    public void setCuisine(List<String> cuisines) {
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
