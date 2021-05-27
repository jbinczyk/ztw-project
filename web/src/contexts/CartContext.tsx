import React, { createContext } from 'react';
import api from '../api';
import { message } from 'antd';
import { Menu } from '../components/routes/manageMenuItem/AddMenuItem';

export interface MenuItem {
    id: string;
    menu: Menu;
    name: string;
    description: string;
    price: number;
    weight: number;
}

const initialState = {
    items: Array<MenuItem>(),
    addToCart: (item: MenuItem) => {
        console.log(item);
    },
    removeItem: (index: number) => {
        console.log(index);
    },
    clearCart: () => {},
    sendOrder: async () => {},
};

type State = Readonly<typeof initialState>;

export const CartContext = createContext(initialState);

class CartContextProvider extends React.Component<{ children: any }> {
    readonly state: State = initialState;

    sendOrder = async () => {
        try {
            const email = localStorage.getItem('email');
            if (email) {
                const user = await api.getUserDataByEmail(email);
                const order = await api.addOrder(parseInt(this.state.items[0].menu.restaurant.id), user.data.id);
                for (const item of this.state.items) {
                    await api.addOrderItems(1, item, order.data);
                }
                this.clearCart();
                message.success('Zamówienie przyjęte');
            }
        } catch (e) {
            console.error(e);
        }
    };

    addToCart = (item: MenuItem) => {
        this.setState({
            ...this.state,
            items: [...this.state.items, item],
        });
    };

    removeItem = (index: number) => {
        this.setState({
            items: this.state.items.filter((_, i) => i !== index),
        });
    };

    clearCart = () => {
        this.setState({
            ...this.state,
            items: [],
        });
    };

    componentDidMount = () => {
        this.setState({
            ...this.state,

            addToCart: this.addToCart,
            clearCart: this.clearCart,
            sendOrder: this.sendOrder,
            removeItem: this.removeItem,
        });
    };

    render() {
        return <CartContext.Provider value={{ ...this.state }}>{this.props.children}</CartContext.Provider>;
    }
}

export default CartContextProvider;
