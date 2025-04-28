// Cian Dicker-Hughes
// G00415413

package com.example.supabase.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.supabase.models.Users;
import com.example.supabase.repository.UserRepository;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.ArrayList;


@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    // Create a new user
    public Users createUser(Users user) {
        return userRepository.save(user);
    }

    // Get all users
    public List<Users> getAllUsers() {
        List<Users> users = new ArrayList<>();
        userRepository.findAll().forEach(users::add);
        return users;
    }

    // Get user by ID
    public Optional<Users> getUserById(int id) {
        return userRepository.findById(id);
    }
    
    // Get user by username
    public Optional<Users> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    // Get user by email
    public Optional<Users> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    // Update user details
    public Users updateUser(Users user) {
        return userRepository.save(user);
    }

}