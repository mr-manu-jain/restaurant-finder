package com.sjsu.cmpe202.finedine.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sjsu.cmpe202.finedine.entity.User;
import com.sjsu.cmpe202.finedine.models.request.DeleteUserRequest;
import com.sjsu.cmpe202.finedine.models.request.UpdateUserRequest;
import com.sjsu.cmpe202.finedine.models.response.DeleteResponse;
import com.sjsu.cmpe202.finedine.models.response.GetAllUsersResponse;
import com.sjsu.cmpe202.finedine.repository.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User checkAndCreateUser(User userData) {
        return userRepository.findByOid(userData.getOid())
            .orElseGet(() -> createNewUser(userData));
    }

    public User createNewUser(User userData) {
        User newUser = new User();
        newUser.setOid(userData.getOid());
        newUser.setName(userData.getName());
        newUser.setEmail(userData.getEmail());
        newUser.setPhone(userData.getPhone());
        newUser.setAddress(userData.getAddress());
        newUser.setCity(userData.getCity());
        newUser.setState(userData.getState());
        newUser.setCountry(userData.getCountry());
        newUser.setZipCode(userData.getZipCode());
        newUser.setRole(userData.getRole());
        System.out.println(newUser);
        return userRepository.save(newUser);
    }

    public DeleteResponse deleteUser(DeleteUserRequest req) {
        DeleteResponse response = new DeleteResponse();
        userRepository.deleteByOid(req.getUserId());
        response.setIsDeleted(true);
        return response;
    }
    
    public User updateUserDetails(UpdateUserRequest request) {
        return userRepository.findByOid(request.getOid())
            .map(existingUser -> {
                existingUser.setName(request.getName());
                existingUser.setEmail(request.getEmail());
                existingUser.setPhone(request.getPhone());
                existingUser.setAddress(request.getAddress());
                existingUser.setCity(request.getCity());
                existingUser.setState(request.getState());
                existingUser.setCountry(request.getCountry());
                existingUser.setZipCode(request.getZipCode());
                existingUser.setRole(request.getRole());
                return userRepository.save(existingUser);
            })
            .orElseThrow(() -> new RuntimeException("User not found with oid: " + request.getOid()));
    }

    public User getUserDetails(String userId) {
        return userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
    }

    public GetAllUsersResponse getAllUsers() {
        GetAllUsersResponse response = new GetAllUsersResponse();
        List<User> users = userRepository.findAll();
        response.setUsers(users);
        response.setTotal(users.size());
        return response;
    }
}
