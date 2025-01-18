package com.sjsu.cmpe202.finedine.repository;

import com.sjsu.cmpe202.finedine.entity.Restaurant;
import com.sjsu.cmpe202.finedine.entity.ReviewsAndRating;
import com.sjsu.cmpe202.finedine.models.request.GetRestaurantDetailsRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.*;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Repository
public class RestaurantTableQueriesImpl implements RestaurantTableQueries {
    @Autowired
    private MongoTemplate mongoTemplate;
    @Autowired
    private ReviewAndRatingRepository reviewAndRatingRepository;

    public List<Restaurant> findRestaurantByNameCuisinesFoodTypesPriceRating(GetRestaurantDetailsRequest req) {
        Query query = new Query();
        if (req.getRestaurantName() != null) {
            query.addCriteria(Criteria.where("restaurantName").regex(".*" + req.getRestaurantName() + ".*", "i"));
        }

        if (req.getCuisines() != null && !req.getCuisines().isEmpty()) {
            query.addCriteria(Criteria.where("cuisines").in(req.getCuisines()));
        }

        if (req.getFoodTypes() != null && !req.getFoodTypes().isEmpty()) {
            query.addCriteria(Criteria.where("foodTypes").in(req.getFoodTypes()));
        }

        if (req.getPrice() != null) {
            if (req.getPriceParameter() != null && req.getPriceParameter().equals("less than")) {
                query.addCriteria(Criteria.where("averagePrice").lte(req.getPrice()));
            }
            if (req.getPriceParameter() != null && req.getPriceParameter().equals("greater than")) {
                query.addCriteria(Criteria.where("averagePrice").gte(req.getPrice()));
            }
        }

        List<Restaurant> restaurants = mongoTemplate.find(query, Restaurant.class);

        if(req.getRating() != null) {
            // Step 1: Extract restaurant IDs from the filtered list
            List<String> restaurantIds = restaurants.stream()
                    .map(Restaurant::getId)
                    .toList();

            // Step 2: Get reviews with a minimum rating and extract restaurant IDs
            List<ReviewsAndRating> reviews = reviewAndRatingRepository.findByRestaurantIdIn(restaurantIds);

            // Step 3: Calculate average rating for each restaurant
            Map<String, Double> restaurantAverageRatings = reviews.stream()
                    .collect(Collectors.groupingBy(
                            ReviewsAndRating::getRestaurantId,
                            Collectors.averagingDouble(ReviewsAndRating::getRating)
                    ));
            /*
            List<ReviewsAndRating> reviews;
            if(req.getRatingParameter() != null && req.getRatingParameter().equals("less than")) {
                reviews = reviewAndRatingRepository.findByRatingLessThanEqual(req.getRating());
            }
            else{
                reviews = reviewAndRatingRepository.findByRatingGreaterThanEqual(req.getRating());
            }

            Set<String> restaurantIdsWithRating = reviews.stream()
                    .map(ReviewsAndRating::getRestaurantId)
                    .collect(Collectors.toSet());
            */
            // Step 4: Filter the pre-filtered restaurants by checking their average rating
            if(req.getRatingParameter() != null && req.getRatingParameter().equals("less than")){
                return restaurants.stream()
                        .filter(restaurant -> {
                            Double avgRating = restaurantAverageRatings.get(restaurant.getId());

                            return avgRating != null && avgRating <= req.getRating();
                        })
                        .collect(Collectors.toList());
            }
            else{
                return restaurants.stream()
                        .filter(restaurant -> {
                            Double avgRating = restaurantAverageRatings.get(restaurant.getId());

                            return avgRating != null && avgRating >= req.getRating();
                        })
                        .collect(Collectors.toList());
            }

        }
        return restaurants;
    }
}
