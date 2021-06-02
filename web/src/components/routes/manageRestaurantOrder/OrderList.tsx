import React from 'react';
import api from '../../../api';

import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ListElemDiv = styled.div`
    background-color: white;
    padding-left: 2vh;
    border: 1px solid black;
    border-radius: 10px;
    margin-bottom: 5px;
    color: black;
`;

const StyledSelect = styled.select`
    height: 1.5rem;
    width: 10rem;
    line-height: 2rem;
    font-size: 1rem;
    border-radius: 0.25rem;
    box-sizing: border-box;
    box-shadow: 0 0 0.5rem 0 rgba(0, 0, 0, 0.25);
    padding: 0 1rem;
    margin: 0;
    margin-left: 1rem;
    margin-right: 1rem;
    border: none;
`;

const StyledOption = styled.option`
    font-size: 1 rem;
`;

const StyledLinkSmaller = styled(Link)`
    text-decoration: none;
    color: black;
    font: bold Arial;
`;

const SearchButton = styled.button`
    height: 2rem;
    line-height: 2rem;
    font-size: 1rem;
    border-radius: 0.25rem;
    box-sizing: border-box;
    box-shadow: 0 0 0.5rem 0 rgba(0, 0, 0, 0.25);
    padding: 0 1rem;
    margin: 0;
    margin-left: 0.5rem;
    color: white;
    border: none;
    background-color: green;
`;

interface OrderListProps {
    orders: Order[];
}

interface User {
    id: number;
    email: string;
    first_name: string;
    phone_numeber: string;
    surname: string;
    address: string;
}

export interface Order {
    id: number;
    status: string;
    orderDate: string;
    purchaser: User;
    restaurant: number;
}

function translateStatus(status: string) {
    if (status === 'WAITING') return 'Oczekujące';
    if (status === 'PROCESSED') return 'Realizowane';
    if (status === 'DELIVERING') return 'W drodze';
    if (status === 'DELIVERED') return 'Dostarczono';

    return status;
}

function handleChangeStatus(orders: Order, event: any) {
    orders.status = event.target.value;
}

async function saveStatus(id: number, date: string, purchaser: number, restaurant: number, newStatus: string) {
    if (newStatus.length > 0) {
        try {
            await api.setOrderStatus(id, date, purchaser, restaurant, newStatus);
        } catch (e) {
            console.error(e);
        }
    }
}

const OrderList: React.SFC<OrderListProps> = (props: OrderListProps) => {
    const { orders } = props;

    const list = orders.map((orders) => {
        return (
            <ListElemDiv key={orders.id}>
                <h4>Klient: {orders.purchaser.email} </h4>
                <h4>Data: {orders.orderDate.substr(0, 10)}</h4>
                <h4>
                    <StyledLinkSmaller to={'/manage-orders/' + orders.id}>Szczegóły zamówienia</StyledLinkSmaller>
                </h4>
                <h4>
                    Status:
                    <StyledSelect onChange={(e) => handleChangeStatus(orders, e)}>
                        <StyledOption value="" hidden selected>
                            {translateStatus(orders.status)}
                        </StyledOption>
                        <StyledOption value="WAITING">{translateStatus('WAITING')}</StyledOption>
                        <StyledOption value="PROCESSED">{translateStatus('PROCESSED')}</StyledOption>
                        <StyledOption value="DELIVERING">{translateStatus('DELIVERING')}</StyledOption>
                        <StyledOption value="DELIVERED">{translateStatus('DELIVERED')}</StyledOption>
                    </StyledSelect>
                    <SearchButton
                        title="Zapisz"
                        onClick={() =>
                            saveStatus(
                                orders.id,
                                orders.orderDate,
                                orders.purchaser.id,
                                orders.restaurant,
                                orders.status,
                            )
                        }
                    >
                        Zapisz
                    </SearchButton>
                </h4>
            </ListElemDiv>
        );
    });

    return <div>{list}</div>;
};

export default OrderList;
