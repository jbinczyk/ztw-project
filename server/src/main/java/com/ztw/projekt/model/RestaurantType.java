package com.ztw.projekt.model;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;

@Entity
@Table(name = "RestaurantTypes")
public class RestaurantType {
    @Id
    @GeneratedValue(generator = "restaurant_type_generator")
    @SequenceGenerator(
            name = "restaurant_type_generator",
            sequenceName = "restaurant_type_sequence",
            initialValue = 1000
    )
    private Long id;

    @Column(columnDefinition = "text")
    @NotEmpty
    private String code;

    @Column(columnDefinition = "text")
    @NotEmpty
    private String displayName;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }
}
