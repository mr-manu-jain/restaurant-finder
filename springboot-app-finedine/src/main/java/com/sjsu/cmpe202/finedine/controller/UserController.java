package com.sjsu.cmpe202.finedine.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sjsu.cmpe202.finedine.entity.User;
import com.sjsu.cmpe202.finedine.models.request.DeleteUserRequest;
import com.sjsu.cmpe202.finedine.models.request.GetUserDetailsRequest;
import com.sjsu.cmpe202.finedine.models.request.UpdateUserRequest;
import com.sjsu.cmpe202.finedine.models.response.DeleteResponse;
import com.sjsu.cmpe202.finedine.models.response.GetAllUsersResponse;
import com.sjsu.cmpe202.finedine.service.UserService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/checkAndCreateUser")
    public ResponseEntity<User> checkAndCreateUser(@RequestBody User userData) {
        System.out.println("Received user data: " + userData);
        User user = userService.checkAndCreateUser(userData);
        System.out.println("Saved user: " + user);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/deleteUser")
    public DeleteResponse deleteUser(@RequestBody DeleteUserRequest deleteUserRequest) {
        return userService.deleteUser(deleteUserRequest);
    }
    
 
    @PostMapping("/updateUser")
    public ResponseEntity<User> updateUserDetails(@RequestBody UpdateUserRequest request) {
        try {
            User updatedUser = userService.updateUserDetails(request);
            return ResponseEntity.ok(updatedUser);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PostMapping("/getUserDetails")
    public ResponseEntity<User> getUserDetails(@RequestBody GetUserDetailsRequest request) {
        try {
            User user = userService.getUserDetails(request.getId());
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/getAllUsers")
    public GetAllUsersResponse getAllUsers() {
        GetAllUsersResponse response = userService.getAllUsers();
        return response;
    }
}