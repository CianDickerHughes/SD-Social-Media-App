// Cian Dicker-Hughes
// G00415413

package com.example.supabase.dto;

/**
 * DTO (Data Transfer Object) for handling login requests.
 * Accepts either a username or an email as the identifier, along with a password.
 */

public class LoginRequest {
    private String identifier; // Can be username or email
    private String password;

    // The login identifier (can be a username or email)
    public String getIdentifier() {
        return identifier;
    }

    // Setter for identifier
    public void setIdentifier(String identifier) {
        this.identifier = identifier;
    }

    // Setter for identifier
    public String getPassword() {
        return password;
    }

    // Setter for identifier
    public void setPassword(String password) {
        this.password = password;
    }
}
