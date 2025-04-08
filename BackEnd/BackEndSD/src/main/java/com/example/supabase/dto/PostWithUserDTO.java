// Cian Dicker-Hughes
// G00415413

package com.example.supabase.dto;

//This class is a Data Transfer Object used to send Post info + User info in a single object
public class PostWithUserDTO {
    private String id;
    private long userId;
    private String img;
    private String description;

    private String uname;
    private String username;
    private String profileImgUrl;

    // Empty Constructor
    public PostWithUserDTO() {}

    // Constructor
    public PostWithUserDTO(String id, long userId, String img, String description, String uname, String username, String profileImgUrl) {
        this.id = id;
        this.userId = userId;
        this.img = img;
        this.description = description;
        this.uname = uname;
        this.username = username;
        this.profileImgUrl = profileImgUrl;
    }

    
    // Getters and setters
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

	public String getUname() {
		return uname;
	}

	public void setUname(String uname) {
		this.uname = uname;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getProfileImgUrl() {
		return profileImgUrl;
	}

	public void setProfileImgUrl(String profileImgUrl) {
		this.profileImgUrl = profileImgUrl;
	}

    
}
