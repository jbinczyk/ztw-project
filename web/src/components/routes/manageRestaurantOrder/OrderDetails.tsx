import React from 'react';

import styled from 'styled-components';

import { RouteComponentProps } from 'react-router-dom';

import api from '../../../api';
import { OrederItem } from '../clientOrderHistory/OrderItemList';
import OrderItemList from './OrderItemList';

const Header = styled.div`
    text-align: center;
`;

const Main = styled.div`
    margin: 0 auto;
    max-width: 31rem;
`;

interface MatchParams {
    id: string;
}

interface IState {
    orderItems: Array<OrederItem>;
}

class OrderDetails extends React.Component<RouteComponentProps<MatchParams>, IState> {
    constructor(props: RouteComponentProps<MatchParams> & IState) {
        super(props);
        this.state = {
            orderItems: new Array<OrederItem>(),
        };
    }

    componentDidMount() {
        this.getOrderItemsInfo();
    }

    getOrderItemsInfo = async () => {
        try {
            const email = localStorage.getItem('email');
            if (email) {
                const response = await api.getRestaurantForUserEmail(email);
                const response2 = await api.getOrderById(Number(this.props.match.params.id));
                if (response.data.id === response2.data.restaurant.id) {
                    const response3 = await api.getOrderItemsByOrderId(Number(this.props.match.params.id));

                    this.setState({
                        orderItems: response3.data,
                    });
                }
            }
        } catch (e) {
            console.error(e);
        }
    };

    render() {
        return (
            <Main>
                <Header>
                    <h1>Szczegóły zamówienia nr: {this.props.match.params.id}</h1>
                </Header>
                <OrderItemList items={this.state.orderItems} />
            </Main>
        );
    }
}

export default OrderDetails;
