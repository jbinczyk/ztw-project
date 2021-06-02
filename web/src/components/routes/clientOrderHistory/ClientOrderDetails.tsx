import React from 'react';

import styled from 'styled-components';

import { UserContext } from '../../../contexts/UserContext';

import { RouteComponentProps, Link } from 'react-router-dom';

import { Button } from 'antd';

import api from '../../../api';
import { OrederItem } from '../clientOrderHistory/OrderItemList';
import OrderItemList from './OrderItemList';
import routes from '../routes';

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

class ClientOrderDetails extends React.Component<RouteComponentProps<MatchParams>, IState> {
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
            const response = await api.getOrderItemsByOrderId(Number(this.props.match.params.id));
            this.setState({
                orderItems: response.data,
            });
        } catch (e) {
            console.error(e);
        }
    };

    render() {
        return (
            <Main>
                <Link to={routes.history}>
                    <Button type="default">Powrót do historii zamówień</Button>
                </Link>
                <Header>
                    <h1>Szczegóły zamówienia nr: {this.props.match.params.id}</h1>
                </Header>
                <OrderItemList items={this.state.orderItems} />
            </Main>
        );
    }
}
ClientOrderDetails.contextType = UserContext;

export default ClientOrderDetails;
