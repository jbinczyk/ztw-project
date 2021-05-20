package com.ztw.projekt.model;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Orders")
public class Order {
    @Id
    @GeneratedValue(generator = "orders_generator")
    @SequenceGenerator(
            name = "orders_generator",
            sequenceName = "orders_sequence",
            initialValue = 1000
    )
    private Long id;

    @JoinColumn(name = "purchaser")
    @ManyToOne
    private User purchaser;

    @JoinColumn(name = "restaurant")
    @ManyToOne
    private Restaurant restaurant;

    @Column(columnDefinition = "date")
    private LocalDateTime orderDate;

    @Column(columnDefinition = "text")
    private String status;

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getPurchaser() {
        return this.purchaser;
    }

    public void setPurchaser(User purchaser) {
        this.purchaser = purchaser;
    }

    public LocalDateTime getOrderDate() {
        return this.orderDate;
    }

    public void setOrderDate(LocalDateTime orderDate) {
        this.orderDate = orderDate;
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Restaurant getRestaurant() {
        return restaurant;
    }

    public void setRestaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
    }
}