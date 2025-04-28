// Cian Dicker-Hughes
// G00415413

package com.example.supabase.models;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "users")
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id") // Maps to PostgreSQL column
    private int id;

    @Column(name = "uname", nullable = false, unique = true)
    private String name;
    
    @Column(name = "username", nullable = false, unique = true)
    private String username;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "profile_img_url")
    private String profileImgUrl;

    @Column(name = "created_at", updatable = false)
    private Instant createdAt;

    @Column(name = "is_private", nullable = false)
    private boolean isPrivate = false;
    
    @Column(name = "bio", nullable = true)
    private String  bio;

    // No-argument constructor (required by JPA)
    public Users() {
        this.createdAt = Instant.now();
    }

    // Constructor
    public Users(String name, String username, String email, String password, String profileImgUrl, boolean isPrivate, String bio) {
    	this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.profileImgUrl = profileImgUrl;
        this.createdAt = Instant.now();
        this.isPrivate = isPrivate;
        this.bio = bio;
    }

	// Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
    
    public String getName() {
 		return name;
 	}

 	public void setName(String name) {
 		this.name = name;
 	}

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getProfileImgUrl() {
        return profileImgUrl;
    }

    public void setProfileImgUrl(String profileImgUrl) {
        this.profileImgUrl = profileImgUrl;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public boolean getIsPrivate() {  
        return isPrivate;
    }

    public void setIsPrivate(boolean isPrivate) {  
        this.isPrivate = isPrivate;
    }

	public String getBio() {
		return bio;
	}

	public void setBio(String bio) {
		this.bio = bio;
	}    
}