package com.ztw.projekt.controller;

import com.ztw.projekt.jwt.JwtFilter;
import com.ztw.projekt.model.User;
import com.ztw.projekt.repository.UserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.Optional;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class AuthenticationController {

    private final int tokenValidityTime = 60 * 60 * 1000;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/auth")
    public String login(@RequestBody User userRequest){
        long currentTimeMillis = System.currentTimeMillis();
        Optional<User> user = userRepository.findAll().stream().filter(u -> u.getEmail().equals(userRequest.getEmail())).findFirst();
        if(user.isPresent() && user.get().getPassword().equals(userRequest.getPassword())){
            return Jwts.builder().setSubject(user.get().getEmail()).claim("role", "user" )
                    .setIssuedAt(new Date(currentTimeMillis)).setExpiration(new Date(currentTimeMillis + tokenValidityTime))
                    .signWith(SignatureAlgorithm.HS512, JwtFilter.key).compact();
        }
        else{
            return null;
        }
    }
}