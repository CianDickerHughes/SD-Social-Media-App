// Cian Dicker-Hughes
// G00415413

package com.example.supabase.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "post")
public class Post {

	@Id
    private String id;
    private long userId; // Reference to the user stored in PostgreSQL
    private String img; // URL or base64 string of the image
    private String description; // Message or caption for the post
    
    // No-argument constructor 
    public Post() {}

    // Constructor
    public Post(long userId, String img, String description) {
        this.userId = userId;
        this.img = img;
        this.description = description;
    }

    // Getters & Setters
    public String getId() { 
    	return id; 
    }
    
    public void setId(String id) { 
    	this.id = id; 
    }

    public long getUserId() { 
    	return userId; 
    }
    
    public void setUserId(long userId) { 
    	this.userId = userId; 
    }

    public String getImg() { 
    	return img; 
    }
    
    public void setImg(String img) { 
    	this.img = img; 
    }

    public String getDescription() { 
    	return description; 
    }
    
    public void setDescription(String description) { 
    	this.description = description; 
    }
}
