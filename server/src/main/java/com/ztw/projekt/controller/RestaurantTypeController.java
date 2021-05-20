package com.ztw.projekt.controller;

import com.ztw.projekt.model.RestaurantType;
import com.ztw.projekt.repository.RestaurantTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class RestaurantTypeController {
    @Autowired
    private RestaurantTypeRepository restaurantTypeRepository;

    @PostMapping("/api/restaurantTypes/post")
    public RestaurantType postRestaurantType(@RequestBody RestaurantType restaurantType){
        restaurantTypeRepository.save(restaurantType);
        return restaurantType;
    }

    @GetMapping("/api/restaurantTypes/all")
    public List<RestaurantType> getAllRestaurantTypes(){
        return restaurantTypeRepository.findAll();
    }

    @PutMapping("/api/restaurantTypes/put")
    public RestaurantType putRestaurantType(@RequestBody RestaurantType restaurantType){
        restaurantTypeRepository.save(restaurantType);
        return restaurantType;
    }
}
