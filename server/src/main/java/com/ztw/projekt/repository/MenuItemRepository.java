package com.ztw.projekt.repository;

import com.ztw.projekt.model.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {
    @Query("SELECT mi FROM MenuItem mi WHERE mi.menu.id = :menuId AND mi.visible = TRUE")
    List<MenuItem> getMenuItemsByMenuId(
            @Param("menuId") Long menuId
    );
}