package com.ztw.projekt.repository;

import com.ztw.projekt.model.Menu;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MenuRepository extends JpaRepository<Menu, Long> {
}