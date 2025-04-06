// Cian Dicker-Hughes
// G00415413

package com.example.supabase.dto;

public class LoginRequest {
    private String identifier; // Can be username or email
    private String password;

    public String getIdentifier() {
        return identifier;
    }

    public void setIdentifier(String identifier) {
        this.identifier = identifier;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
