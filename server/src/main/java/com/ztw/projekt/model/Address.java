package com.ztw.projekt.model;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;

@Entity
@Table(name = "Addresses")
public class Address {
    @Id
    @GeneratedValue(generator = "address_generator")
    @SequenceGenerator(
            name = "address_generator",
            sequenceName = "address_sequence",
            initialValue = 1000
    )
    private Long id;

    @JoinColumn(name ="restaurant")
    @ManyToOne
    private Restaurant restaurant;

    @Column(columnDefinition = "text")
    private String cityName;

    @Column(columnDefinition = "text")
    private String streetName;

    @Column(columnDefinition = "text")
    private String houseNumber;

    @Column(columnDefinition = "text")
    private String postalCode;

    public Address() { }

    public Address(Restaurant restaurant, String cityName, String streetName, String houseNumber, String postalCode) {
        this.restaurant = restaurant;
        this.cityName = cityName;
        this.streetName = streetName;
        this.houseNumber = houseNumber;
        this.postalCode = postalCode;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCityName() {
        return cityName;
    }

    public void setCityName(String cityName) {
        this.cityName = cityName;
    }

    public String getStreetName() {
        return streetName;
    }

    public void setStreetName(String streetName) {
        this.streetName = streetName;
    }

    public String getHouseNumber() {
        return houseNumber;
    }

    public void setHouseNumber(String houseNumber) {
        this.houseNumber = houseNumber;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }
}
