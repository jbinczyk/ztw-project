package com.ztw.projekt.model;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;

@Entity
@Table(name = "MenuItems")
public class MenuItem {
    @Id
    @GeneratedValue(generator = "menu_item_generator")
    @SequenceGenerator(
            name = "menu_item_generator",
            sequenceName = "menu_item_generator",
            initialValue = 1000
    )
    private Long id;

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public MenuItem() {
    }

    public MenuItem(Menu menu, String name, String description, Double price, Double weight, Boolean visible) {
        this.menu = menu;
        this.name = name;
        this.description = description;
        this.price = price;
        this.weight = weight;
        this.visible = visible;
    }

    @JoinColumn(name ="menu")
    @ManyToOne
    private Menu menu;

    public Menu getMenu() {
        return this.menu;
    }

    public void setMenu(Menu menu) {
        this.menu = menu;
    }

    @Column(columnDefinition = "text")
    private String name;

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Column(columnDefinition = "text")
    private String description;

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Column(columnDefinition = "numeric")
    private Double price;

    public Double getPrice() {
        return this.price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    @Column(columnDefinition = "numeric")
    private Double weight;

    public Double getWeight() {
        return this.weight;
    }

    public void setWeight(Double weight) {
        this.weight = weight;
    }

    @Column(columnDefinition = "bool")
    private Boolean visible;

    public Boolean getVisible() {
        return visible;
    }

    public void setVisible(Boolean visible) {
        this.visible = visible;
    }
}