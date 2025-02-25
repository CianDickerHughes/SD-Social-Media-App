package com.example.supabase;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.example.supabase.repository.UserRepository;

@SpringBootApplication
public class BackEndSdApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackEndSdApplication.class, args);
	}
}