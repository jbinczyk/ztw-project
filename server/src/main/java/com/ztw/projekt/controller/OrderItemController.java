package com.ztw.projekt.controller;

import com.ztw.projekt.model.MenuItem;
import com.ztw.projekt.model.Order;
import com.ztw.projekt.model.OrderItem;
import com.ztw.projekt.repository.MenuItemRepository;
import com.ztw.projekt.repository.OrderItemRepository;
import com.ztw.projekt.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class OrderItemController {
    @Autowired
    private OrderItemRepository orderItemsRepository;
    @Autowired
    private MenuItemRepository menuItemRepository;
    @Autowired
    private OrderRepository orderRepository;

    @GetMapping("/api/orderItem/getByOrderId/{orderId}")
    public List<OrderItem> getOrderItemsByOrderId(@PathVariable Long orderId){
        return orderItemsRepository.getOrderItemsByOrderId(orderId);
    }

    @PostMapping("/api/orderItem/post")
    public OrderItem postOrderItem(@RequestBody OrderItem orderItem){
        Optional<MenuItem> menuItem = menuItemRepository.findById(orderItem.getMenuItem().getId());
        Optional<Order> order = orderRepository.findById(orderItem.getOrder().getId());
        if(menuItem.isPresent() && order.isPresent()){
            orderItem.setMenuItem(menuItem.get());
            orderItem.setOrder(order.get());
            return orderItemsRepository.save(orderItem);
        }
        else{
            return null;
        }
    }

    @PutMapping("/api/orderItem/put")
    public OrderItem putOrderItem(@RequestBody OrderItem orderItem){
        Optional<MenuItem> menuItem = menuItemRepository.findById(orderItem.getMenuItem().getId());
        Optional<Order> order = orderRepository.findById(orderItem.getOrder().getId());
        if(menuItem.isPresent() && order.isPresent()){
            orderItem.setMenuItem(menuItem.get());
            orderItem.setOrder(order.get());
            return orderItemsRepository.save(orderItem);
        }
        else{
            return null;
        }
    }

    @DeleteMapping("/api/orderItem/delete/{orderItemId}")
    public boolean deleteOrderItem(@PathVariable Long orderItemId){
        Optional<OrderItem> orderItem = orderItemsRepository.findById(orderItemId);
        if(orderItem.isPresent()){
            orderItemsRepository.delete(orderItem.get());
            return true;
        }
        else{
            return false;
        }
    }
}