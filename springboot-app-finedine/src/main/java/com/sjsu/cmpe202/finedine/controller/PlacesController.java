package com.sjsu.cmpe202.finedine.controller;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.sjsu.cmpe202.finedine.models.response.RestaurantsZipCode;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class PlacesController {
    @Value("${google.api.key}")
    private String apiKey;

    @Value("${google.geocode.url}")
    private String geocodeUrl;

    @Value("${google.places.url}")
    private String placesUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    @PostMapping("/findByZipcode")
    public ResponseEntity<List<RestaurantsZipCode>>  getRestaurants(@RequestBody Map<String, String> request) {
        String zipcode = request.get("zipcode");

        // Step 1: Get Latitude and Longitude
        // https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBQoVNMZv19khhrOkP987h80VRlANxT8OQ&components=postal_code:95113
        String geocodeApiUrl = geocodeUrl + "?key=" + apiKey + "&components=postal_code:" + zipcode;
        Map<String, Object> geocodeResponse = restTemplate.getForObject(geocodeApiUrl, Map.class);

        List<Map<String, Object>> results = (List<Map<String, Object>>) geocodeResponse.get("results");
        if (results.isEmpty()) {
            return ResponseEntity.badRequest().body(null);
        }

        Map<String, Object> location = (Map<String, Object>) ((Map<String, Object>) results.get(0).get("geometry")).get("location");
        double latitude = (double) location.get("lat");
        double longitude = (double) location.get("lng");

        // Step 2: Get Nearby Restaurants
        // https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=37.339071,-121.873328&radius=1000&type=restaurant&key=AIzaSyBQoVNMZv19khhrOkP987h80VRlANxT8OQ
        String placesApiUrl = placesUrl + "?location=" + latitude + "," + longitude + "&radius=1000&type=restaurant&key=" + apiKey;
        Map<String, Object> placesResponse = restTemplate.getForObject(placesApiUrl, Map.class);

        List<Map<String, Object>> placesResults = (List<Map<String, Object>>) placesResponse.get("results");

        // Extract names and addresses
        List<RestaurantsZipCode> restaurants = placesResults.stream()
                .map(place -> new RestaurantsZipCode(
                        (String) place.get("name"),
                        (String) place.get("vicinity"),
                        place.containsKey("rating") ? ((Number) place.get("rating")).doubleValue() : null
                ))
                .collect(Collectors.toList());

        return ResponseEntity.ok(restaurants);
    }

}
