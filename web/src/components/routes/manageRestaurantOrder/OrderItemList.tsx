import React from 'react';

import styled from 'styled-components';
import { MenuItem } from '../manageRestaurantMenu/MenuItemList';

interface OrderItemListProps {
    items: OrederItem[];
}

export interface OrederItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    menuItem: MenuItem;
}

const ListElemDiv = styled.div`
    background-color: white;
    padding-left: 2vh;
    border: 1px solid black;
    border-radius: 10px;
    margin-bottom: 5px;
    color: black;
`;

const OrderItemList: React.FunctionComponent<OrderItemListProps> = (props: OrderItemListProps) => {
    const { items } = props;

    const list = items.map((items) => {
        return (
            <ListElemDiv key={items.menuItem.id}>
                <h2>Nazwa: {items.menuItem.name}</h2>
                <h3>Cena: {items.menuItem.price.toFixed(2)}</h3>
                <h3>Ilość: {items.quantity}</h3>
            </ListElemDiv>
        );
    });

    return <div>{list}</div>;
};

export default OrderItemList;
