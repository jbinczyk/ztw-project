import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Input, message } from 'antd';
import styled from 'styled-components';
import { Restaurant } from '../../RestaurantList';
import api from '../../../api';

import { RouteComponentProps } from 'react-router-dom';

const Main = styled.div`
    margin: 0 auto;
    max-width: 31rem;
`;

export interface Menu {
    id: string;
    dateAdded: string;
    restaurant: Restaurant;
}

interface MatchParams {
    id: string;
}

interface IState {
    isLoading?: boolean;
    id: string;
    name: string;
    description: string;
    weight: string;
    price: string;
    menu?: Menu;
}

class ManageMenuItem extends React.Component<RouteComponentProps<MatchParams>, IState> {
    constructor(props: RouteComponentProps<MatchParams> & IState) {
        super(props);
        this.state = {
            isLoading: true,
            id: '',
            name: '',
            description: '',
            weight: '',
            price: '',
            menu: undefined,
        };
    }

    getMenuItem = async () => {
        try {
            const email = localStorage.getItem('email');
            if (email) {
                const response = await api.getRestaurantForUserEmail(email);
                const response2 = await api.getRestaurantMenuId(response.data.id);
                const response3 = await api.getMenuItemById(Number(this.props.match.params.id));
                if (response2.data.id === response3.data.menu.id) {
                    console.log(response3.data);
                    this.setState({
                        id: response3.data.id,
                        name: response3.data.name,
                        description: response3.data.description,
                        weight: response3.data.weight,
                        price: response3.data.price,
                        menu: response3.data.menu,
                    });
                }
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
                await api.setMenuItem(
                    Number(this.state.id),
                    this.state.name,
                    this.state.description,
                    Number(this.state.weight),
                    Number(this.state.price),
                    this.state.menu,
                );
                message.success('Zapisano zmiany');
            }
        } catch (e) {
            console.error(e);
        }
    };

    componentDidMount() {
        this.getMenuItem();
    }

    render() {
        if (this.state.id) {
            return (
                <Main>
                    <Link to="/manage-menu">
                        <Button>Powrót do menu</Button>
                    </Link>
                    <h1>Edytuj produkt</h1>
                    <form onSubmit={this.handleSubmit}>
                        <h1>Nazwa:</h1>
                        <Input
                            value={this.state.name}
                            placeholder="Nazwa"
                            onChange={this.handleChangeTextName}
                            type="text"
                        />
                        <h1>Opis:</h1>
                        <Input
                            value={this.state.description}
                            placeholder="Opis"
                            onChange={this.handleChangeTextDescription}
                            type="text"
                        />
                        <h1>Waga:</h1>
                        <Input
                            value={this.state.weight}
                            placeholder="Waga"
                            onChange={this.handleChangeTextWeight}
                            type="text"
                        />
                        <h1>Cena:</h1>
                        <Input
                            value={this.state.price}
                            placeholder="Cena"
                            onChange={this.handleChangeTextPrice}
                            type="text"
                        />
                        <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>
                            Zapisz
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

export default ManageMenuItem;
