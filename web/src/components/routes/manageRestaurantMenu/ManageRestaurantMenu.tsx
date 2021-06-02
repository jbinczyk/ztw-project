import React from 'react';

import styled from 'styled-components';

import { Link } from 'react-router-dom';

import { Button } from 'antd';

import api from '../../../api';

import MenuItemList from './MenuItemList';
import { MenuItem } from './MenuItemList';
import { Restaurant } from '../../RestaurantList';

const Main = styled.div`
    margin: 0 auto;
    max-width: 31rem;
`;

// const StyledLink = styled(Link)`
//     text-decoration: none;
//     display: inline-block;
//     font-size: 2rem;
//     transition: all 0.5s ease;
//     padding: 0 1rem;
//     &:hover,
//     &.active {
//         color: orangered;
//     }
//     color: darkorange;
// `;

interface IState {
    isLoading?: boolean;
    name?: string;
    description?: string;
    weight?: string;
    price?: string;
    menuItems: Array<MenuItem>;
    restaurant: string;
}

export interface Menu {
    restaurant: Restaurant;
}

class ManageRestaurantMenu extends React.Component<{}, IState> {
    constructor(props: IState) {
        super(props);
        this.state = {
            isLoading: true,
            name: '',
            description: '',
            weight: '',
            price: '',
            menuItems: new Array<MenuItem>(),
            restaurant: '',
        };
    }

    getMenuInfo = async () => {
        try {
            const email = localStorage.getItem('email');
            if (email) {
                const response = await api.getRestaurantForUserEmail(email);
                const response2 = await api.getRestaurantMenuId(response.data.id);
                const response3 = await api.getRestaurantMenuItemByMenuId(response2.data.id);
                console.log(response3);
                this.setState({
                    menuItems: response3.data,
                    restaurant: response.data.id,
                });
            }
        } catch (e) {
            console.error(e);
        }
    };

    componentDidMount() {
        this.getMenuInfo();
    }

    render() {
        if (this.state.restaurant) {
            return (
                <Main>
                    <Link to="/manage-restaurant">
                        <Button>Powrót do zarządzania restauracją</Button>
                    </Link>
                    <h1>Menu restauracji</h1>
                    <MenuItemList />
                    <Link to={'/add-menu-item'}>
                        <Button>Dodaj pozycję</Button>
                    </Link>
                </Main>
            );
        } else {
            return (
                <Main>
                    <h2>Odmowa dostępu</h2>
                </Main>
            );
        }
    }
}

export default ManageRestaurantMenu;
