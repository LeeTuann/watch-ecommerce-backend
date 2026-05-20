package com.tuanle.watchecommerce.service;

import com.tuanle.watchecommerce.dto.AuthRequest;
import com.tuanle.watchecommerce.dto.AuthResponse;
import com.tuanle.watchecommerce.dto.UserRequest;
import com.tuanle.watchecommerce.dto.UserResponse;

public interface AuthService {
    AuthResponse login(AuthRequest authRequest);
    UserResponse register(UserRequest userRequest);
}
