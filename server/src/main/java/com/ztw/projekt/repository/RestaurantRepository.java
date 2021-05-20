package com.ztw.projekt.repository;

import com.ztw.projekt.model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
    @Query("SELECT DISTINCT a.restaurant FROM Address a WHERE UPPER(a.cityName) LIKE UPPER(:cityName) AND a.restaurant.isDeleted = FALSE")
    List<Restaurant> getRestaurantByDeliveryAddress(
            @Param("cityName") String cityName
    );

    @Query("SELECT r FROM Restaurant r WHERE r.id=:id")
    Restaurant findRestaurantById(
            @Param("id") Long id
    );
}
