package com.ztw.projekt.model;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

@Entity
@Table(name = "Users")
public class User {

    @Id
    @GeneratedValue(generator = "user_generator")
    @SequenceGenerator(
            name = "user_generator",
            sequenceName = "user_sequence",
            initialValue = 1000
    )
    private Long id;

    @Size(max = 50)
    @Column(columnDefinition = "text", unique = true)
    @NotEmpty
    private String email;

    @Size(min = 4, max = 50)
    @Column(columnDefinition = "text")
    @NotEmpty
    private String password;

    @Column(columnDefinition = "text")
    private String firstName;

    @Column(columnDefinition = "text")
    private String surname;

    @JoinColumn(name ="address")
    @OneToOne
    private Address address;

    @Column(columnDefinition = "text")
    private String phoneNumber;

    @JoinColumn(name ="restaurant")
    @ManyToOne
    private Restaurant restaurant;

    @Column(columnDefinition = "bool")
    private Boolean isAdmin;

    @Column(columnDefinition = "bool")
    private Boolean isRestaurantOwner;

    public User() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Restaurant getRestaurant() {
        return restaurant;
    }

    public void setRestaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
    }

    public Boolean getIsAdmin() {
        return isAdmin;
    }

    public void setIsAdmin(Boolean admin) {
        isAdmin = admin;
    }

    public Boolean getIsRestaurantOwner() {
        return isRestaurantOwner;
    }

    public void setIsRestaurantOwner(Boolean isRestaurantOwner) {
        this.isRestaurantOwner = isRestaurantOwner;
    }
}
