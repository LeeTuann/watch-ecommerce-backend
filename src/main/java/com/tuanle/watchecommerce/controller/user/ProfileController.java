package com.tuanle.watchecommerce.controller.user;

import com.tuanle.watchecommerce.dto.UserRequest;
import com.tuanle.watchecommerce.dto.UserResponse;
import com.tuanle.watchecommerce.entity.User;
import com.tuanle.watchecommerce.exception.ResourceNotFoundException;
import com.tuanle.watchecommerce.mapper.AppMapper;
import com.tuanle.watchecommerce.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/users/profile")
public class ProfileController {

    private final UserRepository userRepository;
    private final AppMapper appMapper;
    private final PasswordEncoder passwordEncoder;

    public ProfileController(UserRepository userRepository, AppMapper appMapper, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.appMapper = appMapper;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping
    public ResponseEntity<UserResponse> getProfile(Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(401).build();
        }
        User user = userRepository.findByUsername(principal.getName())
                .orElseThrow(() -> new ResourceNotFoundException("Authenticated user not found"));
        return ResponseEntity.ok(appMapper.toUserResponse(user));
    }

    @PutMapping
    public ResponseEntity<UserResponse> updateProfile(Principal principal, @RequestBody UserRequest request) {
        if (principal == null) {
            return ResponseEntity.status(401).build();
        }
        User user = userRepository.findByUsername(principal.getName())
                .orElseThrow(() -> new ResourceNotFoundException("Authenticated user not found"));

        if (request.getUsername() != null && !request.getUsername().trim().isEmpty()) {
            if (!user.getUsername().equals(request.getUsername()) &&
                    userRepository.findByUsername(request.getUsername()).isPresent()) {
                throw new IllegalArgumentException("Username is already taken");
            }
            user.setUsername(request.getUsername());
        }

        if (request.getEmail() != null) {
            user.setEmail(request.getEmail());
        }

        if (request.getPassword() != null && !request.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(request.getPassword()));
        }

        User saved = userRepository.save(user);
        return ResponseEntity.ok(appMapper.toUserResponse(saved));
    }
}
