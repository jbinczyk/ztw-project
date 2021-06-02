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
    email: string;
    orders: Array<Order>;
}

class ClientOrderHistory extends React.Component<{}, IState> {
    constructor(props: IState) {
        super(props);
        this.state = {
            email: '',
            orders: new Array<Order>(),
        };
    }

    componentDidMount() {
        this.getOrderInfo();
    }

    getOrders = () => {
        return [];
    };

    getOrderInfo = async () => {
        try {
            const email = localStorage.getItem('email');
            const response = await api.getOrdersByUserLogin(email);
            this.setState({
                orders: response.data,
            });
        } catch (e) {
            console.error(e);
        }
    };

    render() {
        return (
            <Main>
                <Header>
                    <h1>Historia Twoich zamówień</h1>
                </Header>
                <OrderList orders={this.state.orders} />
            </Main>
        );
    }
}

export default ClientOrderHistory;
