// Cian Dicker-Hughes
// G00415413

package com.example.supabase.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.supabase.models.Post;
import com.example.supabase.repository.PostRepository;
import java.util.List;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    public List<Post> getPostsByUser(Long userId) {
        return postRepository.findByUserId(userId);
    }

    public Post createPost(Post post) {
        return postRepository.save(post);
    }
    
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }
}

