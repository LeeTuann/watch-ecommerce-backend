package com.tuanle.watchecommerce.service.impl;

import com.tuanle.watchecommerce.dto.UserRequest;
import com.tuanle.watchecommerce.dto.UserResponse;
import com.tuanle.watchecommerce.entity.User;
import com.tuanle.watchecommerce.exception.ResourceNotFoundException;
import com.tuanle.watchecommerce.mapper.AppMapper;
import com.tuanle.watchecommerce.repository.UserRepository;
import com.tuanle.watchecommerce.service.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final AppMapper appMapper;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, AppMapper appMapper, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.appMapper = appMapper;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserResponse> getAllUsers() {
        return userRepository.findAll().stream()
                .map(appMapper::toUserResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public UserResponse getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        return appMapper.toUserResponse(user); // wait, appMapper::toUserResponse is a method reference, so appMapper.toUserResponse(user) is cleaner.
    }

    @Override
    public UserResponse updateUser(Long id, UserRequest userRequest) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));

        if (userRequest.getUsername() != null) {
            user.setUsername(userRequest.getUsername());
        }
        if (userRequest.getEmail() != null) {
            user.setEmail(userRequest.getEmail());
        }
        if (userRequest.getPassword() != null && !userRequest.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(userRequest.getPassword()));
        }
        if (userRequest.getRole() != null) {
            user.setRole(userRequest.getRole());
        }

        User updatedUser = userRepository.save(user);
        return appMapper.toUserResponse(updatedUser);
    }

    @Override
    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        userRepository.delete(user);
    }
}
