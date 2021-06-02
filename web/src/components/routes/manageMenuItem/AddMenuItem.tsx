import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { Button, message, Input } from 'antd';
import { Restaurant } from '../../RestaurantList';
import api from '../../../api';

import { UserContext } from '../../../contexts/UserContext';

const Main = styled.div`
    margin: 0 auto;
    max-width: 31rem;
`;

export interface Menu {
    id: string;
    dateAdded: string;
    restaurant: Restaurant;
}

interface IState {
    isLoading?: boolean;
    name: string;
    description: string;
    weight: string;
    price: string;
    menu?: Menu;
    isAdded: boolean;
}

class AddMenuItem extends React.Component<{}, IState> {
    constructor(props: IState) {
        super(props);
        this.state = {
            isLoading: true,
            name: '',
            description: '',
            weight: '',
            price: '',
            menu: undefined,
            isAdded: false,
        };
    }

    getMenu = async () => {
        try {
            const email = localStorage.getItem('email');
            if (email) {
                const restaurant = await api.getRestaurantForUserEmail(email);
                const response = await api.getRestaurantMenuId(restaurant.data.id);
                console.log(response.data);
                this.setState({
                    menu: response.data,
                });
            }
        } catch (e) {
            console.error(e);
        }
    };

    handleChangeTextName = (event: any) => {
        this.setState({
            name: event.target.value,
        });
    };

    handleChangeTextDescription = (event: any) => {
        this.setState({
            description: event.target.value,
        });
    };

    handleChangeTextWeight = (event: any) => {
        this.setState({
            weight: event.target.value,
        });
    };

    handleChangeTextPrice = (event: any) => {
        this.setState({
            price: event.target.value,
        });
    };

    handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
            if (this.state.menu) {
                await api.addMenuItem(
                    this.state.name,
                    this.state.description,
                    Number(this.state.weight),
                    Number(this.state.price),
                    this.state.menu,
                );
                this.setState({
                    isAdded: true,
                });
                message.success('Dodano pozycję do menu');
            }
        } catch (e) {
            console.error(e);
        }
    };

    componentDidMount() {
        this.getMenu();
    }

    render() {
        if (this.state.menu) {
            if (this.state.isAdded) {
                return <Redirect to="/manage-menu" />;
            }
            return (
                <Main>
                    <Link to="/manage-menu">
                        <Button>Powrót do menu</Button>
                    </Link>
                    <h1>Dodaj produkt</h1>

                    <form onSubmit={this.handleSubmit}>
                        <Input placeholder="Nazwa" onChange={this.handleChangeTextName} type="text" />
                        <Input placeholder="Opis" onChange={this.handleChangeTextDescription} type="text" />
                        <Input placeholder="Waga" onChange={this.handleChangeTextWeight} type="text" />
                        <Input placeholder="Cena" onChange={this.handleChangeTextPrice} type="text" />
                        <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>
                            Dodaj
                        </Button>
                    </form>
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
AddMenuItem.contextType = UserContext;

export default AddMenuItem;
