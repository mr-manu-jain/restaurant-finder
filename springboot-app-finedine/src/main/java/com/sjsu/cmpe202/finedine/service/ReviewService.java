package com.sjsu.cmpe202.finedine.service;

import com.sjsu.cmpe202.finedine.models.request.RestaurantRequest;
import com.sjsu.cmpe202.finedine.models.response.GetRatingsForRestaurantResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import com.sjsu.cmpe202.finedine.entity.ReviewsAndRating;
import com.sjsu.cmpe202.finedine.repository.ReviewAndRatingRepository;
import com.sjsu.cmpe202.finedine.models.request.CreateReviewRequest;

import java.util.List;

@Service
public class ReviewService {

    @Autowired
    private ReviewAndRatingRepository reviewRepository;
    @Autowired
    private ReviewAndRatingRepository reviewAndRatingRepository;
    
    public boolean createReview(CreateReviewRequest request) {
        try {
            validateReviewRequest(request);
            
            ReviewsAndRating review = new ReviewsAndRating();
            review.setRating(request.getRating());
            review.setReview(request.getReview());
            review.setRestaurantId(request.getRestaurantId());
            review.setCreatedAt(System.currentTimeMillis());
            review.setUserId(request.getUserId()); // This should come from security context in production
            review.setUserName(request.getUserName());

            ReviewsAndRating savedReview = reviewRepository.save(review);
            return savedReview != null;
            
        } catch (ResponseStatusException e) {
            throw e;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    private void validateReviewRequest(CreateReviewRequest request) {
        if (request.getRestaurantId() == null || request.getRestaurantId().trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Restaurant ID is required");
        }
        
        if (request.getRating() < 1 || request.getRating() > 5) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Rating must be between 1 and 5");
        }
        
        if (request.getReview() == null || request.getReview().trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Review text is required");
        }
    }

    public GetRatingsForRestaurantResponse getRatingsForRestaurant(RestaurantRequest req){
        GetRatingsForRestaurantResponse response = new GetRatingsForRestaurantResponse();
        List<ReviewsAndRating> reviews = reviewRepository.findByRestaurantId(req.getRestaurantId());
        double averageRating = 0;
        Integer totalRating = 0;
        for(int i = 0; i < reviews.size(); i++){
            totalRating += reviews.get(i).getRating();
        }
        averageRating = (double) totalRating / reviews.size();
        response.setTotalRatings(reviewRepository.countByRestaurantId(req.getRestaurantId()));
        response.setAverageRating(averageRating);
        response.setReviews(reviews);
        return response;
    }
    
    public boolean deleteReview(String reviewId) {
        try {
            reviewAndRatingRepository.deleteById(reviewId);
            return true;
        } catch (Exception e) {
            return false;
        }
      }
}