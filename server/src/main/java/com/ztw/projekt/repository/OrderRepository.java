package com.ztw.projekt.repository;

import com.ztw.projekt.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    @Query("SELECT o FROM Order o WHERE o.purchaser.email = :userLogin ORDER BY o.orderDate DESC")
    List<Order> getOrdersByUserLogin(
            @Param("userLogin") String userLogin
    );

    @Query("SELECT o FROM Order o WHERE o.restaurant.id = :restaurantId ORDER BY o.orderDate DESC")
    List<Order> getOrdersByRestaurantId(
            @Param("restaurantId") Long restaurantId
    );
}