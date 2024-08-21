package com.example.chatapp.controller;

import com.example.chatapp.model.User;
import com.example.chatapp.service.UserService;
import com.example.chatapp.service.JwtService; // Update to use JwtService
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtService jwtService; // Replace JwtUtil with JwtService

    @PostMapping("/register")
    public Map<String, String> register(@RequestBody User user) {
        userService.registerUser(user.getEmail(), user.getPassword());
        return Map.of("message", "Registration successful");
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody User user) {
        User authenticatedUser = userService.loginUser(user.getEmail(), user.getPassword());
        if (authenticatedUser != null) {
            String token = jwtService.generateToken(authenticatedUser.getEmail()); // Use JwtService
            return Map.of("token", token);
        } else {
            return Map.of("error", "Invalid credentials");
        }
    }
}
