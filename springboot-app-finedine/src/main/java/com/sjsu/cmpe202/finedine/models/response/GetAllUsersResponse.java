package com.sjsu.cmpe202.finedine.models.response;

import com.sjsu.cmpe202.finedine.entity.User;

import java.util.List;

public class GetAllUsersResponse {
    private List<User> users;
    private int total;
    public List<User> getUsers() {
        return users;
    }
    public void setUsers(List<User> users) {
        this.users = users;
    }
    public int getTotal() {
        return total;
    }
    public void setTotal(int total) {
        this.total = total;
    }
}
