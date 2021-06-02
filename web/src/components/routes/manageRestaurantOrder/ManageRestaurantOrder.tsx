import React from 'react';

import styled from 'styled-components';

import OrderList from './OrderList';
import { Order } from './OrderList';

import api from '../../../api';

const Header = styled.div`
    text-align: center;
`;

const Main = styled.div`
    margin: 0 auto;
    max-width: 31rem;
`;

interface IState {
    orders: Array<Order>;
}

class ManageRestaurantOrder extends React.Component<{}, IState> {
    constructor(props: IState) {
        super(props);
        this.state = {
            orders: new Array<Order>(),
        };
    }

    componentDidMount() {
        this.getOrderInfo();
    }

    getOrderInfo = async () => {
        try {
            const email = localStorage.getItem('email');
            if (email) {
                const restaurant = await api.getRestaurantForUserEmail(email);
                const orders = await api.getOrdersByRestaurantId(restaurant.data.id);
                console.log(orders.data);
                this.setState({
                    orders: orders.data,
                });
            }
        } catch (e) {
            console.error(e);
        }
    };

    render() {
        return (
            <Main>
                <Header>
                    <h1>Zamówienia</h1>
                </Header>
                <OrderList orders={this.state.orders} />
            </Main>
        );
    }
}

export default ManageRestaurantOrder;
