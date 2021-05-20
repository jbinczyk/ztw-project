package com.ztw.projekt.controller;

import com.ztw.projekt.model.*;
import com.ztw.projekt.repository.*;
import com.ztw.projekt.model.*;
import com.ztw.projekt.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class RestaurantController {

    @Autowired
    private RestaurantRepository restaurantRepository;
    @Autowired
    private RestaurantTypeRepository restaurantTypeRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private MenuRepository menuRepository;
    @Autowired
    private AddressRepository addressRepository;

    @GetMapping("/api/restaurants/all")
    public List<Restaurant> getAllRestaurants(){
        return restaurantRepository.findAll().stream().filter(r -> ! r.getIsDeleted()).collect(Collectors.toList());
    }

    @GetMapping("/api/restaurants/deliveryAddress/{deliveryAddress}")
    public List<Restaurant> getRestaurantByDeliveryAddress(@PathVariable String deliveryAddress){
        String deliveryAddressUpperCase = deliveryAddress.toUpperCase().replaceAll("Ą", "A").
                replaceAll("Ć", "C").replaceAll("Ę", "E").
                replaceAll("Ł", "L").replaceAll("Ń", "N").
                replaceAll("Ó", "O").replaceAll("Ś", "S").
                replaceAll("Ź", "Z").replaceAll("Ż", "Z");
        deliveryAddressUpperCase += "%";
        return restaurantRepository.getRestaurantByDeliveryAddress(deliveryAddressUpperCase);
    }

    @GetMapping("/api/restaurants/{restaurantId}")
    public Restaurant getRestaurantById(@PathVariable Long restaurantId){
        Optional<Restaurant> restaurant = restaurantRepository.findById(restaurantId);
        return restaurant.orElse(null);
    }

    @GetMapping("/api/restaurants/byUserEmail/{userEmail}")
    public Restaurant getRestaurantByUserEmail(@PathVariable String userEmail){
        return userRepository.findRestaurantByUserEmail(userEmail);
    }

    @GetMapping("/api/restaurants/byUserId/{userId}")
    public Restaurant getRestaurantByUserId(@PathVariable Long userId){
        return userRepository.findRestaurantByUserId(userId);
    }

    @PostMapping("api/restaurants/post/{userEmail}")
    public Restaurant postRestaurant(@RequestBody Restaurant newRestaurant, @PathVariable String userEmail){
        Optional<RestaurantType> restaurantType = restaurantTypeRepository.findById(newRestaurant.getRestaurantType().getId());
        User user = userRepository.findUserByUserEmail(userEmail);
        if(restaurantType.isPresent() && user != null){
            newRestaurant.setRestaurantType(restaurantType.get());
            newRestaurant.setIsDeleted(false);
            Restaurant restaurant = restaurantRepository.save(newRestaurant);
            menuRepository.save(new Menu(restaurant, new Date()));
            user.setRestaurant(restaurant);
            user.setIsRestaurantOwner(true);
            userRepository.save(user);
            Address restaurantDefaultAddress = new Address(restaurant, "Wroclaw", null, null, null);
            addressRepository.save(restaurantDefaultAddress);
            return restaurant;
        }
        else {
            return null;
        }
    }

    @PutMapping("/api/restaurants/put")
    public Restaurant putRestaurant(@RequestBody Restaurant modifiedRestaurant){
        Restaurant restaurant = restaurantRepository.findRestaurantById(modifiedRestaurant.getId());
        if(modifiedRestaurant.getName() != null) restaurant.setName(modifiedRestaurant.getName());
        if(modifiedRestaurant.getRestaurantType() != null){
            Optional<RestaurantType> newRestaurantType = restaurantTypeRepository.findById(modifiedRestaurant.getRestaurantType().getId());
            if(newRestaurantType.isPresent()) restaurant.setRestaurantType(newRestaurantType.get());
            else return null;
        }
        if(modifiedRestaurant.getIsDeleted() != null) restaurant.setIsDeleted(modifiedRestaurant.getIsDeleted());
        restaurantRepository.save(restaurant);
        return restaurant;
    }

}
