import React from 'react';
import { Link } from 'react-router-dom';
import { Restaurant } from '../../RestaurantList';
import api from '../../../api';
import styled from 'styled-components';
import { Button } from 'antd';
import RestaurantAdminList from './RestaurantAdminList';

const Main = styled.div`
    margin: 0 auto;
    max-width: 31rem;
`;

interface IState {
    restaurants: Array<Restaurant>;
}

class ManageRestaurantAdmin extends React.Component<{}, IState> {
    constructor(props: IState) {
        super(props);
        this.state = {
            restaurants: new Array<Restaurant>(),
        };
    }

    componentDidMount() {
        this.getRestaurants();
    }

    getRestaurants = async () => {
        try {
            const res = await api.getRestaurantsAll();
            console.log(res.data);
            this.setState({
                restaurants: res.data,
            });
        } catch (e) {
            console.error(e);
        }
    };

    render() {
        return (
            <Main>
                <Link to="/admin-panel">
                    <Button>Powrót do panelu admina</Button>
                </Link>
                <h1>Wszystkie resturacje</h1>
                <RestaurantAdminList restaurants={this.state.restaurants} />
            </Main>
        );
    }
}
export default ManageRestaurantAdmin;
