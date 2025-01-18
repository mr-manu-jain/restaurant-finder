package com.sjsu.cmpe202.finedine.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mongodb.client.gridfs.model.GridFSFile;
import com.sjsu.cmpe202.finedine.entity.Restaurant;
import com.sjsu.cmpe202.finedine.models.request.*;
import com.sjsu.cmpe202.finedine.models.response.*;
import com.sjsu.cmpe202.finedine.service.RestaurantService;
import com.sjsu.cmpe202.finedine.service.ReviewService;
import com.sjsu.cmpe202.finedine.service.UserService;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/restaurant")
public class RestaurantController {
    @Autowired
    private RestaurantService restaurantService;
    private UserService userService;
    @Autowired
    private ReviewService reviewService;
    @Autowired
    private GridFsTemplate gridFsTemplate;
    @PostMapping("/createRestaurant")
    public CreateRestaurantResponse createRestaurant(@RequestParam("restaurantData") String restaurantDataJson,
                                                     @RequestParam(value = "image", required = false) MultipartFile image) throws IOException {
        // Parse JSON data for restaurant details
        ObjectMapper objectMapper = new ObjectMapper();
        Restaurant restaurantData = objectMapper.readValue(restaurantDataJson, Restaurant.class);
        // Handle the image file if provided
        if (image != null && !image.isEmpty()) {
            ObjectId imageId = gridFsTemplate.store(image.getInputStream(), image.getOriginalFilename(), image.getContentType());
            restaurantData.setImageUrl(imageId.toString());
        }
        return restaurantService.createRestaurant(restaurantData);
    }

    @PostMapping("/image/{id}")
    public ResponseEntity<byte[]> getImage(@PathVariable String id) throws IOException {
        GridFSFile file = gridFsTemplate.findOne(new Query(Criteria.where("_id").is(id)));
        if (file != null) {
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            IOUtils.copy(gridFsTemplate.getResource(file).getInputStream(), outputStream);
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(file.getMetadata().get("_contentType").toString()))
                    .body(outputStream.toByteArray());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/getAllRestaurants")
    public GetAllRestaurantsResponse getAllRestaurants(@RequestBody GetAllRestaurantsRequest getAllRestaurantsRequest) {
        return restaurantService.getAllRestaurants(getAllRestaurantsRequest);
    }

    @PostMapping("/updateRestaurant")
    public UpdateRestaurantResponse updateRestaurant(@RequestParam("restaurantData") String restaurantDataJson,
                                                     @RequestParam(value = "image", required = false) MultipartFile image) throws IOException {
        // Parse JSON data for restaurant details
        ObjectMapper objectMapper = new ObjectMapper();
        UpdateRestaurantRequest restaurantData = objectMapper.readValue(restaurantDataJson, UpdateRestaurantRequest.class);
        // Handle the image file if provided
        if (image != null && !image.isEmpty()) {
            ObjectId imageId = gridFsTemplate.store(image.getInputStream(), image.getOriginalFilename(), image.getContentType());
            restaurantData.setImageUrl(imageId.toString());
        }

        return restaurantService.updateRestaurant(restaurantData);
    }

    @PostMapping("/getRestaurantDetails")
    public GetAllRestaurantsResponse getRestaurantDetails(@RequestBody GetRestaurantDetailsRequest getRestaurantDetailsRequest){
        return restaurantService.getRestaurantDetails(getRestaurantDetailsRequest);
    }

    @PostMapping("/deleteRestaurant")
    public DeleteResponse deleteRestaurants(@RequestBody DeleteRestaurantRequest deleteRestaurantRequest){
        return restaurantService.deleteRestaurant(deleteRestaurantRequest);
    }

    @PostMapping("/getRatingsForRestaurant")
    public GetRatingsForRestaurantResponse getRatingsForRestaurant(@RequestBody RestaurantRequest restaurantRequest){
        return reviewService.getRatingsForRestaurant(restaurantRequest);
    }

    @PostMapping("/getRestaurant")
    public  GetRestaurantResponse getRestaurant(@RequestBody GetRestaurantRequest getRestaurantRequest){
        return  restaurantService.getRestaurant(getRestaurantRequest);
    }

    @PostMapping("getByZipCode")
    public GetAllRestaurantsResponse getByZipCode(@RequestBody ZipCodeRequest zipCodeRequest){
        return restaurantService.getByZipCode(zipCodeRequest);
    }
}
