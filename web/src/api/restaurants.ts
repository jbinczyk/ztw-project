import axios from 'axios'
import { config } from '../Consts'
import { Menu } from '../components/routes/manageMenuItem/AddMenuItem'
import { Order } from '../components/routes/clientOrderHistory/OrderList'
import { MenuItem } from '../components/routes/browseRestaurantMenu/MenuItemsInSummary'

export const getRestaurantsAll = () => {
    return axios.get(`${config.url.API_URL}/api/restaurants/all`)
}

export const getRestaurantsForLocation = (location: string) => {
    return axios.get(`${config.url.API_URL}/api/restaurants/deliveryAddress/${location}`)
}

export const getRestaurantById = (restaurantId: number) => {
    return axios.get(`${config.url.API_URL}/api/restaurants/${restaurantId}`)
}

export const getRestaurantForUserId = async (userId: number) => {
    return axios.get(`${config.url.API_URL}/api/restaurants/user/${userId}`)
}

export const getRestaurantForUserEmail = async (userEmail: string) => {
    return axios.get(`${config.url.API_URL}/api/restaurants/byUserEmail/${userEmail}`)
}

export const setRestaurantInvisible = async (restaurantId: number) => {
    const restaurant = {
        id: restaurantId,
        isDeleted: true
    }
    return axios.put(`${config.url.API_URL}/api/restaurants/put`, restaurant)
}

export const setRestaurantName = async (restaurantId: number, newName: string) => {
    const restaurant = {
        id: restaurantId,
        name: newName
    }
    return axios.put(`${config.url.API_URL}/api/restaurants/put`, restaurant)
}

export const setRestaurantType = async (restaurantId: number, newTypeId: number) => {
    const restaurant = {
        id: restaurantId,
        restaurantType: {
            id: newTypeId
        }
    }
    return axios.put(`${config.url.API_URL}/api/restaurants/put`, restaurant)
}

export const createRestaurant = async (userEmail: string) => {
    const restaurantType = {
        id: 1
    }
    const restaurant = {
        name: "nazwa",
        restaurantType: restaurantType
    }
    return axios.post(`${config.url.API_URL}/api/restaurants/post/${userEmail}`, restaurant)
}

// MENU

export const addMenuItem = async (name: string, description: string, weight: number, price: number, menu: Menu) => {
    const menuItem = {
        description: description,
        name: name,
        price: price,
        weight: weight,
        menu: menu,
        visible: true
    }
    return axios.post(`${config.url.API_URL}/api/menuItem/post`, menuItem)
}

export const setMenuItem = async (id: number, name: string, description: string, weight: number, price: number, menu: Menu) => {
    const menuItem = {
        id: id,
        description: description,
        name: name,
        price: price,
        weight: weight,
        menu: menu,
        visible: true
    }
    return axios.put(`${config.url.API_URL}/api/menuItem/put`, menuItem)
}

export const getMenuItemById = (menuItemId: number) => {
    return axios.get(`${config.url.API_URL}/api/menuItem/getById/${menuItemId}`)
}

export const getMenuById = (menuId: string) => {
    return axios.get(`${config.url.API_URL}/api/menu/${menuId}`)
}

export const getRestaurantMenuId = (restaurantId: string) => {
    return axios.get(`${config.url.API_URL}/api/menu/get/${restaurantId}`)
}

export const getRestaurantMenuItemByMenuId = (menuId: string) => {
    return axios.get(`${config.url.API_URL}/api/menuItem/getByMenuId/${menuId}`)
}

export const deleteMenuItemById = (itemId: number) => {
    return axios.delete(`${config.url.API_URL}/api/menuItem/delete/${itemId}`)
}

//ORDERS

export const getOrderById = (orderId: number) => {
    return axios.get(`${config.url.API_URL}/api/order/getById/${orderId}`)
}

export const getOrdersByUserLogin = (userLogin: string | null) => {
    return axios.get(`${config.url.API_URL}/api/order/getByUserLogin/${userLogin}`)
}

export const getOrdersByRestaurantId = (restaurantId: number) => {
    return axios.get(`${config.url.API_URL}/api/order/getByRestaurantId/${restaurantId}`)
}

export const getOrderItemsByOrderId = (orderId: number) => {
    return axios.get(`${config.url.API_URL}/api/orderItem/getByOrderId/${orderId}`)
}

export const setOrderStatus = async (orderId: number, date: string, purchaser: number, restaurant: number, newStatus: string) => {
    const order = {
        id: orderId,
        order_date: date,
        purchaser: { id: purchaser },
        restaurant: restaurant,
        status: newStatus
    }
    return axios.put(`${config.url.API_URL}/api/order/put`, order)
}

export const addOrder = async (restaurantId: number, purchaser: number) => {
    const restaurant = {
        id: restaurantId
    }
    const user = {
        id: purchaser
    }
    const order = {
        restaurant: restaurant,
        purchaser: user
    }
    return axios.post(`${config.url.API_URL}/api/order/post`, order)
}

export const addOrderItems = async (quantity: number, menuItem: MenuItem, relatedOrder: Order) => {
    const orderItem = {
        quantity: quantity,
        menuItem: menuItem,
        order: relatedOrder
    }
    console.log(orderItem)
    return axios.post(`${config.url.API_URL}/api/orderItem/post`, orderItem)
}

//TYPES restaurantTypes/all

export const getAllRestaurantTypes = () => {
    return axios.get(`${config.url.API_URL}/api/restaurantTypes/all`)
}

//ADDRESS

export const getAddressByRestaurantId = async (restaurantId: number) => {
    return axios.get(`${config.url.API_URL}/api/address/get/byRestaurantId/${restaurantId}`)
}

export const addressPut = async (addressId: number, cityName: string) => {
    const address = {
        id: addressId,
        cityName: cityName
    }
    return axios.put(`${config.url.API_URL}/api/address/put`, address)
}