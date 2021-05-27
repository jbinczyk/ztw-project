import {
    getRestaurantsAll,
    getRestaurantsForLocation,
    getRestaurantForUserId,
    getOrdersByUserLogin,
    getRestaurantForUserEmail,
    getRestaurantById,
    setRestaurantType,
    addOrder,
    addressPut,
    createRestaurant,
    getAllRestaurantTypes,
    getOrdersByRestaurantId,
    addMenuItem,
    getMenuItemById,
    getRestaurantMenuItemByMenuId,
    deleteMenuItemById,
    getRestaurantMenuId,
    getOrderItemsByOrderId,
    setRestaurantName,
    setOrderStatus,
    addOrderItems,
    setMenuItem,
    getAddressByRestaurantId,
    setRestaurantInvisible,
    getOrderById,
} from './restaurants'

import {
    signin,
    signup
} from './auth'

import {
    getUserDataByEmail
} from './users'

export default {
    getRestaurantsAll,
    addOrder,
    addressPut,
    createRestaurant,
    getRestaurantForUserEmail,
    getRestaurantMenuItemByMenuId,
    getRestaurantsForLocation,
    getRestaurantForUserId,
    getRestaurantById,
    addOrderItems,
    setRestaurantName,
    getAddressByRestaurantId,
    getRestaurantMenuId,
    deleteMenuItemById,
    addMenuItem,
    setMenuItem,
    getMenuItemById,
    getOrdersByRestaurantId,
    setRestaurantType,
    setOrderStatus,
    getAllRestaurantTypes,
    setRestaurantInvisible,
    getOrdersByUserLogin,
    getOrderItemsByOrderId,
    signin,
    signup,
    getUserDataByEmail,
    getOrderById
}