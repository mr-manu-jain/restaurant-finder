package com.sjsu.cmpe202.finedine.models.response;

import com.sjsu.cmpe202.finedine.entity.ReviewsAndRating;

import java.util.List;

public class GetRatingsForRestaurantResponse {
    private long totalRatings;
    private double averageRating;
    private List<ReviewsAndRating> reviews;

    public long getTotalRatings() {
        return totalRatings;
    }

    public void setTotalRatings(long totalRatings) {
        this.totalRatings = totalRatings;
    }

    public double getAverageRating() {
        return averageRating;
    }

    public void setAverageRating(double averageRating) {
        this.averageRating = averageRating;
    }
    public List<ReviewsAndRating> getReviews() {
        return reviews;
    }
    public void setReviews(List<ReviewsAndRating> reviews) {
        this.reviews = reviews;
    }
}
