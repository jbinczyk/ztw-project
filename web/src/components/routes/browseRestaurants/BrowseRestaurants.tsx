import React from 'react';
import styled from 'styled-components';

import RestaurantList, { Restaurant } from '../../RestaurantList';
import { RouteComponentProps } from 'react-router-dom';
import { getRestaurantsForLocation } from '../../../api/restaurants';

export interface Props {}

export interface State {}

const Header = styled.div`
    text-align: center;
`;

const Main = styled.div`
    margin: 0 auto;
    max-width: 31rem;
`;

interface MatchParams {
    location: string;
}

interface IState {
    isLoading?: boolean;
    name?: string;
    description?: string;
    weight?: string;
    price?: string;
    paymentMethod?: string;
    orderId?: string;
    restaurantList: Array<Restaurant>;
}

class BrowseRestaurants extends React.Component<RouteComponentProps<MatchParams>, IState> {
    constructor(props: RouteComponentProps<MatchParams> & IState) {
        super(props);
        this.state = {
            isLoading: true,
            name: '',
            description: '',
            weight: '',
            price: '',
            paymentMethod: '',
            restaurantList: new Array<Restaurant>(),
        };
    }

    getRestaurantsForLocation = async () => {
        let location = this.props.match.params.location.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        location = location.replace(/\u0142/g, 'l');
        try {
            const res = await getRestaurantsForLocation(location);
            const restaurants = res.data;
            this.setState({
                restaurantList: restaurants,
                isLoading: false,
            });
        } catch (e) {
            console.error(e);
        }
    };

    componentDidMount() {
        this.getRestaurantsForLocation();
    }

    render() {
        return (
            <Main>
                {this.state.isLoading ? (
                    <Header>
                        <h1>Ładowanie</h1>
                    </Header>
                ) : (
                    <div>
                        <Header>
                            <h1>Restauracje w mieście</h1>
                            <h2>{this.props.match.params.location}</h2>
                        </Header>
                        <RestaurantList restaurants={this.state.restaurantList} />
                    </div>
                )}
            </Main>
        );
    }
}

export default BrowseRestaurants;
