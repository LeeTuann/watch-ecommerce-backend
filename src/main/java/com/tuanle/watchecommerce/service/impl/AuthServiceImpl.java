package com.tuanle.watchecommerce.service.impl;

import com.tuanle.watchecommerce.dto.AuthRequest;
import com.tuanle.watchecommerce.dto.AuthResponse;
import com.tuanle.watchecommerce.dto.UserRequest;
import com.tuanle.watchecommerce.dto.UserResponse;
import com.tuanle.watchecommerce.entity.Cart;
import com.tuanle.watchecommerce.entity.User;
import com.tuanle.watchecommerce.enums.Role;
import com.tuanle.watchecommerce.exception.BadRequestException;
import com.tuanle.watchecommerce.mapper.AppMapper;
import com.tuanle.watchecommerce.repository.CartRepository;
import com.tuanle.watchecommerce.repository.UserRepository;
import com.tuanle.watchecommerce.security.JwtUtils;
import com.tuanle.watchecommerce.service.AuthService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final CartRepository cartRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final AppMapper appMapper;

    public AuthServiceImpl(AuthenticationManager authenticationManager,
                           UserRepository userRepository,
                           CartRepository cartRepository,
                           PasswordEncoder passwordEncoder,
                           JwtUtils jwtUtils,
                           AppMapper appMapper) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.cartRepository = cartRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
        this.appMapper = appMapper;
    }

    @Override
    public AuthResponse login(AuthRequest authRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtUtils.generateToken(authentication);

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("Authenticated user not found in database"));

        return new AuthResponse(token, user.getUsername(), user.getRole().name());
    }

    @Override
    public UserResponse register(UserRequest userRequest) {
        if (userRepository.findByUsername(userRequest.getUsername()).isPresent()) {
            throw new BadRequestException("Username is already taken");
        }

        // We also want to check for email uniqueness if provided
        if (userRequest.getEmail() != null && userRepository.findAll().stream()
                .anyMatch(u -> userRequest.getEmail().equalsIgnoreCase(u.getEmail()))) {
            throw new BadRequestException("Email is already registered");
        }

        User user = new User();
        user.setUsername(userRequest.getUsername());
        user.setPassword(passwordEncoder.encode(userRequest.getPassword()));
        user.setEmail(userRequest.getEmail());
        
        // Default to USER role if none specified
        user.setRole(userRequest.getRole() != null ? userRequest.getRole() : Role.USER);

        User savedUser = userRepository.save(user);

        // Auto-initialize an empty cart for the newly registered user
        Cart cart = new Cart();
        cart.setUser(savedUser);
        cartRepository.save(cart);

        return appMapper.toUserResponse(savedUser);
    }
}
