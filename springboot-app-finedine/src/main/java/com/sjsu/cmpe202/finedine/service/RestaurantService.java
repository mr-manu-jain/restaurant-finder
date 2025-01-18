package com.sjsu.cmpe202.finedine.service;

import com.sjsu.cmpe202.finedine.entity.Restaurant;
import com.sjsu.cmpe202.finedine.models.request.*;
import com.sjsu.cmpe202.finedine.models.response.*;
import com.sjsu.cmpe202.finedine.repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RestaurantService {
    @Autowired
    private RestaurantRepository restaurantRepository;

    public CreateRestaurantResponse createRestaurant(Restaurant restaurantData) {
        restaurantData.setCreatedAt(System.currentTimeMillis());
        restaurantData.setUpdatedAt(System.currentTimeMillis());
        Restaurant savedRestaurant = restaurantRepository.save(restaurantData);
        CreateRestaurantResponse createRestaurantResponse = new CreateRestaurantResponse();
        createRestaurantResponse.setRestaurantAdded(true);
        return createRestaurantResponse;
    }

    public GetAllRestaurantsResponse getAllRestaurants(GetAllRestaurantsRequest getAllRestaurantsRequest) {
        GetAllRestaurantsResponse getAllRestaurantsResponse = new GetAllRestaurantsResponse();
        if(getAllRestaurantsRequest.getOwnerId().equals("0")){
            getAllRestaurantsResponse.setRestaurants(restaurantRepository.findAll());
            getAllRestaurantsResponse.setTotal(restaurantRepository.findAll().size());
        }
        else{
            getAllRestaurantsResponse.setRestaurants(restaurantRepository.findByOwnerId(getAllRestaurantsRequest.getOwnerId()));
            getAllRestaurantsResponse.setTotal(restaurantRepository.findByOwnerId(getAllRestaurantsRequest.getOwnerId()).size());
        }
        return getAllRestaurantsResponse;
    }

    public UpdateRestaurantResponse updateRestaurant(UpdateRestaurantRequest req){
        UpdateRestaurantResponse response = new UpdateRestaurantResponse();
        Optional<Restaurant> restaurant = restaurantRepository.findById(req.getId());
        if(restaurant.isPresent()){
            Restaurant res = restaurant.get();
            if(req.getRestaurantName() != null){
                res.setRestaurantName(req.getRestaurantName());
            }
            if(req.getOwnerId() != null){
                res.setOwnerId(req.getOwnerId());
            }
            if(req.getDescription() != null){
                res.setDescription(req.getDescription());
            }
            if(req.getAddress() != null){
                res.setAddress(req.getAddress());
            }
            if(req.getCity() != null){
                res.setCity(req.getCity());
            }
            if(req.getState() != null){
                res.setState(req.getState());
            }
            if(req.getCountry() != null){
                res.setCountry(req.getCountry());
            }
            if(req.getZipCode() != null){
                res.setZipCode(req.getZipCode());
            }
            if(req.getPhoneNumber() != null){
                res.setPhoneNumber(req.getPhoneNumber());
            }
            if(req.getAveragePrice() != null){
                res.setAveragePrice(req.getAveragePrice());
            }
            if(req.getReservation() != null){
                res.setReservation(req.getReservation());
            }
            if(req.getFranchise() != null){
                res.setFranchise(res.getFranchise());
            }
            if(req.getCuisines() != null){
                res.setCuisine(req.getCuisines());
            }
            if(req.getFoodTypes() != null){
                res.setFoodTypes(req.getFoodTypes());
            }
            if(req.getImageUrl() != null){
                res.setImageUrl(req.getImageUrl());
            }
            res.setUpdatedAt(System.currentTimeMillis());
            restaurantRepository.save(res);
        }
        response.setRestaurantUpdated(true);
        return response;
    }

    public GetAllRestaurantsResponse getRestaurantDetails(GetRestaurantDetailsRequest req) {
        GetAllRestaurantsResponse response = new GetAllRestaurantsResponse();
        response.setRestaurants(restaurantRepository.findRestaurantByNameCuisinesFoodTypesPriceRating(req));
        response.setTotal(response.getRestaurants().size());
        return response;
    }

    public DeleteResponse deleteRestaurant(DeleteRestaurantRequest req) {
        DeleteResponse response = new DeleteResponse();
        restaurantRepository.deleteById(req.getRestaurantId());
        response.setIsDeleted(true);
        return response;
    }

    public GetRestaurantResponse getRestaurant(GetRestaurantRequest req) {
        GetRestaurantResponse response = new GetRestaurantResponse();
        response.setRestaurant(restaurantRepository.getRestaurantById(req.getRestaurantId()));
        return response;
    }

    public GetAllRestaurantsResponse getByZipCode(ZipCodeRequest req){
        GetAllRestaurantsResponse response = new GetAllRestaurantsResponse();
        response.setRestaurants(restaurantRepository.getRestaurantByZipCode(req.getZipCode()));
        response.setTotal(restaurantRepository.getRestaurantByZipCode(req.getZipCode()).size());
        return response;
    }
}
