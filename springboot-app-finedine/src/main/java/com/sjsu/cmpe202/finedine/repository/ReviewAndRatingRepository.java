package com.sjsu.cmpe202.finedine.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.sjsu.cmpe202.finedine.entity.ReviewsAndRating;

import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewAndRatingRepository extends MongoRepository<ReviewsAndRating, String> {
    // MongoDB Atlas specific queries can be added here
	// Find all reviews for a specific restaurant
    List<ReviewsAndRating> findByRestaurantId(String restaurantId);
    
    // Find all reviews by a specific user
    List<ReviewsAndRating> findByUserId(String userId);
    
    // Find reviews by restaurant with minimum rating
    List<ReviewsAndRating> findByRestaurantIdAndRatingGreaterThanEqual(String restaurantId, Integer rating);
    
    // Find reviews by restaurant with rating range
    List<ReviewsAndRating> findByRestaurantIdAndRatingBetween(String restaurantId, Integer minRating, Integer maxRating);

    List<ReviewsAndRating> findByRestaurantIdIn(List<String> restaurantIds);

    // Check if user has already reviewed a restaurant
    Optional<ReviewsAndRating> findByRestaurantIdAndUserId(String restaurantId, String userId);
    
    // Find latest reviews for a restaurant
    List<ReviewsAndRating> findByRestaurantIdOrderByCreatedAtDesc(String restaurantId);

    List<ReviewsAndRating> findByRatingGreaterThanEqual(Double rating);

    List<ReviewsAndRating> findByRatingLessThanEqual(Double rating);

    // Custom query to find reviews with specific text (case insensitive)
    @Query("{ 'restaurantId': ?0, 'review': { $regex: ?1, $options: 'i' }}")
    List<ReviewsAndRating> findByRestaurantIdAndReviewContainingIgnoreCase(String restaurantId, String text);
    
    // Count total reviews for a restaurant
    long countByRestaurantId(String restaurantId);
    
    // Calculate average rating for a restaurant
    @Query(value = "{ 'restaurantId': ?0 }", fields = "{ 'rating': 1 }")
    List<ReviewsAndRating> findRatingsByRestaurantId(String restaurantId);
    
    // Delete all reviews for a specific restaurant
    static void deleteByRestaurantId(String restaurantId) {
		// TODO Auto-generated method stub
		
	}
    
    // Delete a specific review by restaurant and user
    void deleteByRestaurantIdAndUserId(String restaurantId, String userId);

}