package com.example.supabase;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.example.supabase.repository.UserRepository;

@SpringBootApplication
public class BackEndSdApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackEndSdApplication.class, args);
	}

	/*@Bean
    public CommandLineRunner demo(UserRepository userRepository) {
        return args -> {
            System.out.println("Users: " + userRepository.findAll());
        };
    }*/
	
}
