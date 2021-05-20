package com.ztw.projekt.controller;

import com.ztw.projekt.model.Order;
import com.ztw.projekt.model.Restaurant;
import com.ztw.projekt.repository.OrderRepository;
import com.ztw.projekt.repository.RestaurantRepository;
import com.ztw.projekt.repository.UserRepository;
import com.ztw.projekt.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class OrderController {
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RestaurantRepository restaurantRepository;

    @GetMapping("/api/order/getById/{orderId}")
    public Order getOrderById(@PathVariable Long orderId){
        Optional<Order> order = orderRepository.findById(orderId);
        return order.orElse(null);
    }

    @GetMapping("/api/order/getByUserLogin/{userLogin}")
    public List<Order> getOrdersByUserLogin(@PathVariable String userLogin){
        return orderRepository.getOrdersByUserLogin(userLogin);
    }

    @GetMapping("/api/order/getByRestaurantId/{restaurantId}")
    public List<Order> getOrdersByRestaurantId(@PathVariable Long restaurantId){
        return orderRepository.getOrdersByRestaurantId(restaurantId);
    }

    @PostMapping("/api/order/post")
    public Order postOrder(@RequestBody Order order){
        Optional<User> user = userRepository.findById(order.getPurchaser().getId());
        Optional<Restaurant> restaurant = restaurantRepository.findById(order.getRestaurant().getId());
        if(user.isPresent() && restaurant.isPresent()) {
            order.setPurchaser(user.get());
            order.setRestaurant(restaurant.get());
            if(order.getStatus() == null) order.setStatus("WAITING");
            if(order.getOrderDate() == null) order.setOrderDate(LocalDateTime.now());
            return orderRepository.save(order);
        }
        else {
            return null;
        }
    }

    @PutMapping("/api/order/put")
    public Order putOrder(@RequestBody Order modifiedOrder){
        Optional<Order> order = orderRepository.findById(modifiedOrder.getId());
        if(order.isPresent()){
            Order orderToModify = order.get();
            if(modifiedOrder.getOrderDate() != null)
                orderToModify.setOrderDate(modifiedOrder.getOrderDate());
            if(modifiedOrder.getStatus() != null)
                orderToModify.setStatus(modifiedOrder.getStatus());
            if(modifiedOrder.getPurchaser() != null){
                Optional<User> newPurchaser = userRepository.findById(modifiedOrder.getPurchaser().getId());
                if(newPurchaser.isPresent()){
                    orderToModify.setPurchaser(newPurchaser.get());
                }
                else{
                    return null;
                }
            }
            if(modifiedOrder.getRestaurant() != null){
                Optional<Restaurant> newRestaurant = restaurantRepository.findById(modifiedOrder.getRestaurant().getId());
                if(newRestaurant.isPresent()){
                    orderToModify.setRestaurant(newRestaurant.get());
                }
                else{
                    return null;
                }
            }
            return orderRepository.save(orderToModify);
        }
        else{
            return null;
        }
    }

    @DeleteMapping("/api/order/delete/{orderId}")
    public boolean deleteOrder(@PathVariable Long orderId){
        Optional<Order> order = orderRepository.findById(orderId);
        if(order.isPresent()){
            orderRepository.delete(order.get());
            return true;
        }
        else{
            return false;
        }
    }
}