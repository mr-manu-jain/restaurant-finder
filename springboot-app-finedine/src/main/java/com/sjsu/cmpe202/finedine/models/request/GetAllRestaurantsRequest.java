package com.sjsu.cmpe202.finedine.models.request;

public class GetAllRestaurantsRequest {
    private String ownerId;

    public String getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(String ownerId) {
        this.ownerId = ownerId;
    }
}
