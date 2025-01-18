package com.sjsu.cmpe202.finedine.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.sjsu.cmpe202.finedine.service.ReviewService;
import com.sjsu.cmpe202.finedine.models.request.CreateReviewRequest;
import com.sjsu.cmpe202.finedine.models.request.DeleteReviewRequest;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/reviews")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;

    @PostMapping("/create")
    public ResponseEntity<Map<String, Boolean>> createReview(@RequestBody CreateReviewRequest request) {
        boolean isAdded = reviewService.createReview(request);
        Map<String, Boolean> response = new HashMap<>();
        response.put("ReviewAdded", isAdded);
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/deleteReview")
    public ResponseEntity<?> deleteReview(@RequestBody DeleteReviewRequest request) {
        try {
            boolean isDeleted = reviewService.deleteReview(request.getReviewId());
            Map<String, Boolean> response = new HashMap<>();
            response.put("isDeleted", isDeleted);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Boolean> response = new HashMap<>();
            response.put("isDeleted", false);
            return ResponseEntity.badRequest().body(response);
        }
    }
}