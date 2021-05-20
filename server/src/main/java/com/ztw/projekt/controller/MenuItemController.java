package com.ztw.projekt.controller;

import com.ztw.projekt.model.*;
import com.ztw.projekt.repository.MenuItemRepository;
import com.ztw.projekt.repository.MenuRepository;
import com.ztw.projekt.model.Menu;
import com.ztw.projekt.model.MenuItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class MenuItemController {
    @Autowired
    private MenuItemRepository menuItemRepository;
    @Autowired
    private MenuRepository menuRepository;

    @GetMapping("/api/menuItem/getByMenuId/{menuId}")
    public List<MenuItem> getMenuItemByMenuId(@PathVariable Long menuId){
        return menuItemRepository.getMenuItemsByMenuId(menuId);
    }

    @GetMapping("/api/menuItem/getById/{menuItemId}")
    public MenuItem getMenuItemByMenuItemId(@PathVariable Long menuItemId){
        Optional<MenuItem> menuItem = menuItemRepository.findById(menuItemId);
        return menuItem.orElse(null);
    }

    @PostMapping("/api/menuItem/post")
    public MenuItem postMenuItem(@RequestBody MenuItem menuItem){
        Optional<Menu> menu = menuRepository.findById(menuItem.getMenu().getId());
        if(menu.isPresent()){
            menuItem.setMenu(menu.get());
            return menuItemRepository.save(menuItem);
        }
        else{
            return null;
        }
    }

    @PutMapping("/api/menuItem/put")
    public MenuItem putMenuItem(@RequestBody MenuItem menuItem){
        Optional<Menu> menu = menuRepository.findById(menuItem.getMenu().getId());
        Optional<MenuItem> oldMenuItem = menuItemRepository.findById(menuItem.getId());
        if(menu.isPresent() && oldMenuItem.isPresent()){
            menuItem.setMenu(menu.get());
            MenuItem newMenuItem = new MenuItem(menu.get(), menuItem.getName(), menuItem.getDescription(), menuItem.getPrice(), menuItem.getWeight(), menuItem.getVisible());
            oldMenuItem.get().setVisible(false);
            menuItemRepository.save(oldMenuItem.get());
            return menuItemRepository.save(newMenuItem);
        }
        else{
            return null;
        }
    }

    @DeleteMapping("/api/menuItem/delete/{menuItemId}")
    public boolean deleteMenuItem(@PathVariable Long menuItemId){
        Optional<MenuItem> menuItemOpt = menuItemRepository.findById(menuItemId);
        if(menuItemOpt.isPresent()){
            MenuItem menuItem = menuItemOpt.get();
            menuItem.setVisible(false);
            menuItemRepository.save(menuItem);
            return true;
        }
        else{
            return false;
        }
    }

}