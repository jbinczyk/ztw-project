package com.ztw.projekt.controller;

import com.ztw.projekt.model.User;
import com.ztw.projekt.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/users")
    User postUser(@RequestBody User newUser) {
        try{
            if(newUser.getIsAdmin() == null) newUser.setIsAdmin(false);
            if(newUser.getIsRestaurantOwner() == null) newUser.setIsRestaurantOwner(false);
            return userRepository.save(newUser);
        }
        catch (Exception e){
            return null;
        }
    }

    @GetMapping("/api/users/{userLogin}")
    public User getUserByLogin(@PathVariable String userLogin){
        Optional<User> user = userRepository.findAll().stream().filter(u -> u.getEmail().equals(userLogin)).findFirst();
        return user.orElse(null);
    }
}
