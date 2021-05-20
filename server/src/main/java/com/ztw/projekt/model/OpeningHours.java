package com.ztw.projekt.model;

import javax.persistence.*;
import java.time.LocalTime;

@Entity
@Table(name = "OpeningHours")
public class OpeningHours {
    @Id
    @GeneratedValue(generator = "opening_hours_generator")
    @SequenceGenerator(
            name = "opening_hours_generator",
            sequenceName = "opening_hours_sequence",
            initialValue = 1000
    )
    private Long id;

    @JoinColumn(name ="restaurantAddress")
    @OneToOne
    private Address restaurantAddress;

    @Column(columnDefinition = "time")
    private LocalTime openingTimeMonday;

    @Column(columnDefinition = "time")
    private LocalTime closingTimeMonday;

    @Column(columnDefinition = "time")
    private LocalTime openingTimeTuesday;

    @Column(columnDefinition = "time")
    private LocalTime closingTimeTuesday;

    @Column(columnDefinition = "time")
    private LocalTime openingTimeWednesday;

    @Column(columnDefinition = "time")
    private LocalTime closingTimeWednesday;

    @Column(columnDefinition = "time")
    private LocalTime openingTimeThursday;

    @Column(columnDefinition = "time")
    private LocalTime closingTimeThursday;

    @Column(columnDefinition = "time")
    private LocalTime openingTimeFriday;

    @Column(columnDefinition = "time")
    private LocalTime closingTimeFriday;

    @Column(columnDefinition = "time")
    private LocalTime openingTimeSaturday;

    @Column(columnDefinition = "time")
    private LocalTime closingTimeSaturday;

    @Column(columnDefinition = "time")
    private LocalTime openingTimeSunday;

    @Column(columnDefinition = "time")
    private LocalTime closingTimeSunday;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalTime getOpeningTimeMonday() {
        return openingTimeMonday;
    }

    public void setOpeningTimeMonday(LocalTime openingTimeMonday) {
        this.openingTimeMonday = openingTimeMonday;
    }

    public LocalTime getClosingTimeMonday() {
        return closingTimeMonday;
    }

    public void setClosingTimeMonday(LocalTime closingTimeMonday) {
        this.closingTimeMonday = closingTimeMonday;
    }

    public LocalTime getOpeningTimeTuesday() {
        return openingTimeTuesday;
    }

    public void setOpeningTimeTuesday(LocalTime openingTimeTuesday) {
        this.openingTimeTuesday = openingTimeTuesday;
    }

    public LocalTime getClosingTimeTuesday() {
        return closingTimeTuesday;
    }

    public void setClosingTimeTuesday(LocalTime closingTimeTuesday) {
        this.closingTimeTuesday = closingTimeTuesday;
    }

    public LocalTime getOpeningTimeWednesday() {
        return openingTimeWednesday;
    }

    public void setOpeningTimeWednesday(LocalTime openingTimeWednesday) {
        this.openingTimeWednesday = openingTimeWednesday;
    }

    public LocalTime getClosingTimeWednesday() {
        return closingTimeWednesday;
    }

    public void setClosingTimeWednesday(LocalTime closingTimeWednesday) {
        this.closingTimeWednesday = closingTimeWednesday;
    }

    public LocalTime getOpeningTimeThursday() {
        return openingTimeThursday;
    }

    public void setOpeningTimeThursday(LocalTime openingTimeThursday) {
        this.openingTimeThursday = openingTimeThursday;
    }

    public LocalTime getClosingTimeThursday() {
        return closingTimeThursday;
    }

    public void setClosingTimeThursday(LocalTime closingTimeThursday) {
        this.closingTimeThursday = closingTimeThursday;
    }

    public LocalTime getOpeningTimeFriday() {
        return openingTimeFriday;
    }

    public void setOpeningTimeFriday(LocalTime openingTimeFriday) {
        this.openingTimeFriday = openingTimeFriday;
    }

    public LocalTime getClosingTimeFriday() {
        return closingTimeFriday;
    }

    public void setClosingTimeFriday(LocalTime closingTimeFriday) {
        this.closingTimeFriday = closingTimeFriday;
    }

    public LocalTime getOpeningTimeSaturday() {
        return openingTimeSaturday;
    }

    public void setOpeningTimeSaturday(LocalTime openingTimeSaturday) {
        this.openingTimeSaturday = openingTimeSaturday;
    }

    public LocalTime getClosingTimeSaturday() {
        return closingTimeSaturday;
    }

    public void setClosingTimeSaturday(LocalTime closingTimeSaturday) {
        this.closingTimeSaturday = closingTimeSaturday;
    }

    public LocalTime getOpeningTimeSunday() {
        return openingTimeSunday;
    }

    public void setOpeningTimeSunday(LocalTime openingTimeSunday) {
        this.openingTimeSunday = openingTimeSunday;
    }

    public LocalTime getClosingTimeSunday() {
        return closingTimeSunday;
    }

    public void setClosingTimeSunday(LocalTime closingTimeSunday) {
        this.closingTimeSunday = closingTimeSunday;
    }

    public Address getRestaurantAddress() {
        return restaurantAddress;
    }

    public void setRestaurantAddress(Address restaurantAddress) {
        this.restaurantAddress = restaurantAddress;
    }
}
