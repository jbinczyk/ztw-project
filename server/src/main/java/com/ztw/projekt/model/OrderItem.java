package com.ztw.projekt.model;

import javax.persistence.*;

@Entity
@Table(name = "OrderItems")
public class OrderItem {
    @Id
    @GeneratedValue(generator = "order_items_generator")
    @SequenceGenerator(
            name = "order_items_generator",
            sequenceName = "order_items_sequence",
            initialValue = 1000
    )
    private Long id;

    @JoinColumn(name = "relatedOrder")
    @ManyToOne
    private Order order;

    @JoinColumn(name = "menuItem")
    @ManyToOne
    private MenuItem menuItem;

    @Column(columnDefinition = "numeric")
    private Double quantity;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Order getOrder() {
        return this.order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public MenuItem getMenuItem() {
        return this.menuItem;
    }

    public void setMenuItem(MenuItem menuItem) {
        this.menuItem = menuItem;
    }

    public Double getQuantity() {
        return this.quantity;
    }

    public void setQuantity(Double quantity) {
        this.quantity = quantity;
    }

}