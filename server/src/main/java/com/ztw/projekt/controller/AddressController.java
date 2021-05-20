package com.ztw.projekt.controller;

import com.ztw.projekt.model.Address;
import com.ztw.projekt.repository.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class AddressController {
    @Autowired
    private AddressRepository addressRepository;

    @GetMapping("/api/address/get/byRestaurantId/{restaurantId}")
    public Address getAddressByRestaurantId(@PathVariable Long restaurantId){
        return addressRepository.getByRestaurantId(restaurantId);
    }

    @PutMapping("/api/address/put")
    public Address putAddress(@RequestBody Address modifiedAddress){
        Optional<Address> addressToModifyOpt = addressRepository.findById(modifiedAddress.getId());
        if(addressToModifyOpt.isPresent()){
            Address addressToModify = addressToModifyOpt.get();
            if(modifiedAddress.getCityName() != null) addressToModify.setCityName(modifiedAddress.getCityName());
            if(modifiedAddress.getHouseNumber() != null) addressToModify.setHouseNumber(modifiedAddress.getHouseNumber());
            if(modifiedAddress.getPostalCode() != null) addressToModify.setPostalCode(modifiedAddress.getPostalCode());
            if(modifiedAddress.getStreetName() != null) addressToModify.setStreetName(modifiedAddress.getStreetName());
            return addressRepository.save(addressToModify);
        }
        else{
            return null;
        }
    }
}
