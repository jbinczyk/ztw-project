package com.ztw.projekt.model;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;

@Entity
@Table(name = "Restaurants")
public class Restaurant {
    @Id
    @GeneratedValue(generator = "restaurant_generator")
    @SequenceGenerator(
            name = "restaurant_generator",
            sequenceName = "restaurant_sequence",
            initialValue = 1000
    )
    private Long id;

    @Column(columnDefinition = "text")
    @NotEmpty
    private String name;

    @JoinColumn(name ="restaurantType")
    @ManyToOne
    private RestaurantType restaurantType;

    @Column(columnDefinition = "bool")
    private Boolean isDeleted;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public RestaurantType getRestaurantType() {
        return restaurantType;
    }

    public void setRestaurantType(RestaurantType restaurantType) {
        this.restaurantType = restaurantType;
    }

    public Boolean getIsDeleted() {
        return isDeleted;
    }

    public void setIsDeleted(Boolean deleted) {
        isDeleted = deleted;
    }
}
