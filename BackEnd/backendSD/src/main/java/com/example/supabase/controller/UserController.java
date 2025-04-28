// Cian Dicker-Hughes
// G00415413

package com.example.supabase.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.supabase.dto.LoginRequest;
import com.example.supabase.models.Users;
import com.example.supabase.service.UserService;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000") // Allow only frontend requests
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    // Create a new user
    // Standard Create a new user endpoint
    /*@PostMapping
    public ResponseEntity<Users> createUser(@RequestBody Users user) {
        return ResponseEntity.ok(userService.createUser(user));
    }*/
    
    // Custom Create User Endpoint renamed to addUser
    @PostMapping("/addUser")
    public ResponseEntity<Users> addUser(@RequestBody Users user) {
        // Additional validation can be added here
        if (user.getUsername() == null || user.getEmail() == null || user.getPassword() == null) {
            return ResponseEntity.badRequest().build();
        }
        Users createdUser = userService.createUser(user);
        return ResponseEntity.ok(createdUser);
    }
    
    // User Login (Accepts either username or email)
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        String identifier = loginRequest.getIdentifier();
        String password = loginRequest.getPassword();

        // Try finding user by username or email
        Optional<Users> userOptional = userService.getUserByUsername(identifier);
        if (!userOptional.isPresent()) {
            userOptional = userService.getUserByEmail(identifier);
        }

        if (userOptional.isPresent()) {
            Users user = userOptional.get();
            if (user.getPassword().equals(password)) { 
                return ResponseEntity.ok(user);
            } else {
                return ResponseEntity.badRequest().body("Invalid password");
            }
        } else {
            return ResponseEntity.badRequest().body("User not found");
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Users> updateUser(@PathVariable int id, @RequestBody Users updatedUser) {
        Optional<Users> existingUserOptional = userService.getUserById(id);
        
        if (existingUserOptional.isPresent()) {
            Users existingUser = existingUserOptional.get();

            // Update fields
            if (updatedUser.getName() != null) existingUser.setName(updatedUser.getName());
            if (updatedUser.getUsername() != null) existingUser.setUsername(updatedUser.getUsername());
            if (updatedUser.getPassword() != null) existingUser.setPassword(updatedUser.getPassword());
            if (updatedUser.getEmail() != null) existingUser.setEmail(updatedUser.getEmail());
            if (updatedUser.getProfileImgUrl() != null) existingUser.setProfileImgUrl(updatedUser.getProfileImgUrl());
            if (updatedUser.getBio() != null) existingUser.setBio(updatedUser.getBio());
            existingUser.setIsPrivate(updatedUser.getIsPrivate());

            Users savedUser = userService.updateUser(existingUser);
            return ResponseEntity.ok(savedUser);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Users>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    // Get user by ID
    @GetMapping("/{id}")
    public ResponseEntity<Users> getUserById(@PathVariable int id) {
        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    // Get user by username
    @GetMapping("/username/{username}")
    public ResponseEntity<Users> getUserByUsername(@PathVariable String username) {
        return userService.getUserByUsername(username)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Get user by email
    @GetMapping("/email/{email}")
    public ResponseEntity<Users> getUserByEmail(@PathVariable String email) {
        return userService.getUserByEmail(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}