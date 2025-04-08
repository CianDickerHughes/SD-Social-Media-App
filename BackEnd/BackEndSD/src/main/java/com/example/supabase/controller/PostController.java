// Cian Dicker-Hughes
// G00415413

package com.example.supabase.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.supabase.dto.PostWithUserDTO;
import com.example.supabase.models.Post;
import com.example.supabase.service.PostService;

@RestController
@RequestMapping("/posts")
public class PostController {

    @Autowired
    private PostService postService;

    // Create a new post
    @PostMapping
    public ResponseEntity<Post> createPost(@RequestBody Post post) {    	
        Post savedPost = postService.createPost(post);
        return ResponseEntity.ok(savedPost);
    }
    
    // Get all posts
    @GetMapping
    public ResponseEntity<List<PostWithUserDTO>> getAllPosts() {
        List<PostWithUserDTO> posts = postService.getAllPostsWithUserInfo();
        return ResponseEntity.ok(posts);
    }

    // Get all posts by userId
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<PostWithUserDTO>> getPostsByUserId(@PathVariable Long userId) {
        List<PostWithUserDTO> posts = postService.getPostsByUserWithUserInfo(userId);
        return ResponseEntity.ok(posts);
    }
    
}
