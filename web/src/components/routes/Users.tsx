import React from "react";
import axios from "axios";
import { Restaurant } from "../RestaurantList";


export interface User {
  id: string,
  firstName: string,
  email: string, 
  restaurant: Restaurant
}

function Users() {
  let users;
  const getUsers = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/api/users/wojtek@gmail.com`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(function (response: any) {
        users = response.data;
        console.log(response.data);
      })
      .catch(function (error: any) {
        // handle error
        console.log(error);
      });
  };

  getUsers();

  return <div>{users}</div>;
}

export default Users;
