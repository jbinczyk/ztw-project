package com.ztw.projekt.controller;

import com.ztw.projekt.model.Menu;
import com.ztw.projekt.model.Restaurant;
import com.ztw.projekt.repository.MenuRepository;
import com.ztw.projekt.repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Optional;
import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class MenuController {
    @Autowired
    private MenuRepository menuRepository;
    @Autowired
    private RestaurantRepository restaurantRepository;

    @GetMapping("/api/menu/get/{restaurantId}")
    public Menu getMenuByRestaurantId(@PathVariable Long restaurantId){
        List<Menu> menuList = menuRepository.findAll();
        for(Menu menu : menuList){
            if(menu.getRestaurant().getId().equals(restaurantId)) return menu;
        }
        return null;
    }

    @PostMapping("/api/menu/post")
    public Menu postMenu(@RequestBody Menu menu){
        Optional<Restaurant> restaurant = restaurantRepository.findById(menu.getRestaurant().getId());
        if(restaurant.isPresent()){
            menu.setRestaurant(restaurant.get());
            if(menu.getDateAdded() == null) menu.setDateAdded(new Date());
            return menuRepository.save(menu);
        }
        else {
            return null;
        }
    }

    @PutMapping("/api/menu/put")
    public Menu putMenu(@RequestBody Menu menu){
        Optional<Restaurant> restaurant = restaurantRepository.findById(menu.getRestaurant().getId());
        if(restaurant.isPresent()){
            menu.setRestaurant(restaurant.get());
            if(menu.getDateAdded() == null) menu.setDateAdded(new Date());
            return menuRepository.save(menu);
        }
        else {
            return null;
        }
    }

    @DeleteMapping("/api/menu/delete/{menuId}")
    public boolean deleteMenu(@PathVariable Long menuId){
        Optional<Menu> menu = menuRepository.findById(menuId);
        if(menu.isPresent()){
            menuRepository.delete(menu.get());
            return true;
        }
        else{
            return false;
        }
    }

}