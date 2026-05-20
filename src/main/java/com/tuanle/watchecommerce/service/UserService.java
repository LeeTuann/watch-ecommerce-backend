package com.tuanle.watchecommerce.service;

import com.tuanle.watchecommerce.dto.UserRequest;
import com.tuanle.watchecommerce.dto.UserResponse;

import java.util.List;

public interface UserService {
    List<UserResponse> getAllUsers();
    UserResponse getUserById(Long id);
    UserResponse updateUser(Long id, UserRequest userRequest);
    void deleteUser(Long id);
}
