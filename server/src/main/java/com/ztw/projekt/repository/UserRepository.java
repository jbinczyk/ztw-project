package com.ztw.projekt.repository;

import com.ztw.projekt.model.Restaurant;
import com.ztw.projekt.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    @Query("SELECT u.restaurant FROM User u WHERE u.email=:userEmail AND u.restaurant.isDeleted = FALSE")
    Restaurant findRestaurantByUserEmail(
            @Param("userEmail") String userEmail
    );
    @Query("SELECT u.restaurant FROM User u WHERE u.id=:userId AND u.restaurant.isDeleted = FALSE")
    Restaurant findRestaurantByUserId(
            @Param("userId") Long userId
    );
}
