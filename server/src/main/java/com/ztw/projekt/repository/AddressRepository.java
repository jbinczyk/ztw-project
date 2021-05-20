package com.ztw.projekt.repository;

import com.ztw.projekt.model.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AddressRepository extends JpaRepository<Address, Long> {

    @Query("SELECT a FROM Address a WHERE a.restaurant.id = :restaurantId")
    Address getByRestaurantId(
            @Param("restaurantId") Long restaurantId
    );
}
