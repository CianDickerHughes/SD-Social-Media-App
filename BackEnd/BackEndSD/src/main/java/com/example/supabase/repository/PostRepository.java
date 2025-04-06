// Cian Dicker-Hughes
// G00415413

package com.example.supabase.repository;

import com.example.supabase.models.Post;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface PostRepository extends MongoRepository<Post, String> {
    List<Post> findByUserId(Long userId);
}
