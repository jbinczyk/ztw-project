package com.ztw.projekt.model;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.util.Date;

@Entity
@Table(name = "Menu")
public class Menu {
    @Id
    @GeneratedValue(generator = "menu_generator")
    @SequenceGenerator(
            name = "menu_generator",
            sequenceName = "menu_generator",
            initialValue = 1000
    )
    private Long id;

    @JoinColumn(name ="restaurant")
    @ManyToOne
    private Restaurant restaurant;

    @Column(columnDefinition = "date")
    private Date dateAdded;

    public Menu() {
    }

    public Menu(Restaurant restaurant, Date dateAdded) {
        this.restaurant = restaurant;
        this.dateAdded = dateAdded;
    }

    public Restaurant getRestaurant() {
        return this.restaurant;
    }

    public void setRestaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getDateAdded(){
        return this.dateAdded;
    }

    public void setDateAdded(Date dateAdded){
        this.dateAdded = dateAdded;
    }

}