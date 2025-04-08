// Cian Dicker-Hughes
// G00415413

package com.example.supabase.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.supabase.dto.PostWithUserDTO;
import com.example.supabase.models.Post;
import com.example.supabase.repository.PostRepository;
import com.example.supabase.models.Users;
import com.example.supabase.repository.UserRepository;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;
    
    @Autowired
    private UserRepository userRepository;

    // Create and save a new post
    public Post createPost(Post post) {
        return postRepository.save(post);
    }
    
    // Get all posts, and for each one, include the associated user info
    public List<PostWithUserDTO> getAllPostsWithUserInfo() {
        List<Post> posts = postRepository.findAll();
        Collections.reverse(posts);
        List<PostWithUserDTO> postDTOs = new ArrayList<>();

        for (Post post : posts) {
            // Fetch the user by userId (converted to int — ideally should use Long)
            userRepository.findById((int) post.getUserId()).ifPresent(user -> {
            	// Convert post and user to DTO and add to list
                PostWithUserDTO dto = toDTO(post, user);
                postDTOs.add(dto);
            });
        }

        return postDTOs;
    }
    
    // Get posts by a specific user, along with their user details (used in profile pages etc.)
    public List<PostWithUserDTO> getPostsByUserWithUserInfo(Long userId) {
        List<Post> posts = postRepository.findByUserId(userId);
        Collections.reverse(posts);
        List<PostWithUserDTO> postDTOs = new ArrayList<>();

        // Fetch the user once
        Optional<Users> userOptional = userRepository.findById(userId.intValue());
        if (userOptional.isEmpty()) return postDTOs;

        Users user = userOptional.get();

        // For each post, add the user's info to the DTO
        for (Post post : posts) {
            PostWithUserDTO dto = new PostWithUserDTO(
                post.getId(),
                post.getUserId(),
                post.getImg(),
                post.getDescription(),
                user.getName(),
                user.getUsername(),
                user.getProfileImgUrl()
            );
            postDTOs.add(dto);
        }

        return postDTOs;
    }
    
    // Helper method to convert a Post and User into a PostWithUserDTO
    private PostWithUserDTO toDTO(Post post, Users user) {
        return new PostWithUserDTO(
            post.getId(),
            post.getUserId(),
            post.getImg(),
            post.getDescription(),
            user.getName(),
            user.getUsername(),
            user.getProfileImgUrl()
        );
    }
}

