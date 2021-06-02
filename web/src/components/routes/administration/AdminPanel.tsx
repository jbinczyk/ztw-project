import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import api from '../../../api';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import { UserContext } from '../../../contexts/UserContext';

import { Button } from 'antd';

// CHARTS
import Paper from '@material-ui/core/Paper';
import { Chart, ArgumentAxis, ValueAxis, BarSeries, Legend, Title } from '@devexpress/dx-react-chart-material-ui';

import { Stack } from '@devexpress/dx-react-chart';
import { Restaurant } from '../../RestaurantList';

// import { ageStructure } from '../../../demo-data/data-vizualization';

// const chartData = [
//     { key: 'polska', val: 1 },
//     { key: 'turecka', val: 5 },
//     { key: 'wloska', val: 6 },
//     { key: 'francuska', val: 4 },
//     { key: 'chinska', val: 3 },
// ]

// const styles = {
//     titleText: {
//         textAlign: 'left',
//     },
// };

const StyledLink = styled(Link)` 
  text-decoration: none;
  text-align: center
    display: inline-block;
    font-size: 2rem;
    text-align: center;
    transition: all 0.5s ease;
    padding: 0 1rem;
    &:hover,&.active {
        color: orangered;
    }
    color: darkorange;
`;

// const stacks = [
//     { series: ['👶 Young', '🧑 Adult', '🧓 Old'] },
// ];

interface IRestaurantDataItem {
    key: string;
    val: number;
}

interface IRestaurants extends Array<Restaurant> {}

interface IState {
    isLoading: boolean;
    restaurants?: IRestaurants;
    restaurantsData: Array<IRestaurantDataItem>;
}

interface MatchParams {
    id: string;
}

const AdminPanelContent = styled.div`
    padding: 1rem;
`;

class AdminPanel extends React.Component<RouteComponentProps<MatchParams>, IState> {
    constructor(props: RouteComponentProps<MatchParams> & IState) {
        super(props);
        this.state = {
            isLoading: true,
            restaurants: [],
            restaurantsData: Array<any>(),
        };
    }

    getRestaurantInfo = async () => {
        try {
            const response = await api.getRestaurantsAll();
            this.setState({
                restaurants: response.data,
            });
            console.log(response.data);
        } catch (e) {
            console.error(e);
        }
        this.countRestaurantsByType();
    };

    countRestaurantsByType = async () => {
        let polska = 0;
        let wloska = 0;
        let grecka = 0;
        let hiszpanska = 0;
        let turecka = 0;

        if (this.state.restaurants) {
            for (let i = 0; i < this.state.restaurants.length; i++) {
                if (this.state.restaurants[i].restaurantType.displayName === 'polska') {
                    polska += 1;
                }
                if (this.state.restaurants[i].restaurantType.displayName === 'włoska') {
                    wloska += 1;
                }
                if (this.state.restaurants[i].restaurantType.displayName === 'grecka') {
                    grecka += 1;
                }
                if (this.state.restaurants[i].restaurantType.displayName === 'hiszpańska') {
                    hiszpanska += 1;
                }
                if (this.state.restaurants[i].restaurantType.displayName === 'turecka') {
                    turecka += 1;
                }
            }
        }

        const data = [
            { key: 'polska', val: polska },
            { key: 'włoska', val: wloska },
            { key: 'grecka', val: grecka },
            { key: 'hiszpańska', val: hiszpanska },
            { key: 'turecka', val: turecka },
        ];
        this.setState({
            restaurantsData: data,
            isLoading: false,
        });
    };

    componentDidMount() {
        this.getRestaurantInfo();
    }

    render() {
        return (
            <UserContext.Consumer>
                {(context) => {
                    const { email } = context;
                    const stacks = [{ series: ['Restauracja'] }];

                    return (
                        <AdminPanelContent>
                            <h3>Panel Administratora</h3>
                            <p>Witaj {email}</p>
                            <StyledLink to={'/manage-restaurants-admin'}>
                                <Button type="primary" block>
                                    Zarządzanie restauracjami
                                </Button>
                            </StyledLink>
                            <Paper>
                                <Chart data={this.state.restaurantsData}>
                                    <ArgumentAxis />
                                    <ValueAxis />
                                    <BarSeries name="Restauracje" valueField="val" argumentField="key" />
                                    {/* <BarSeries
                                        name="👶 Oooo"
                                        valueField="young"
                                        argumentField="state"
                                    />
                                    <BarSeries
                                        name="🧑 Adult"
                                        valueField="middle"
                                        argumentField="state"
                                    />
                                    <BarSeries
                                        name="🧓 Old"
                                        valueField="older"
                                        argumentField="state"
                                    /> */}
                                    <Stack stacks={stacks} />
                                    <Title text="Liczba restauracji według typu" />
                                    <Legend />
                                </Chart>
                            </Paper>
                        </AdminPanelContent>
                    );
                }}
            </UserContext.Consumer>
        );
    }
}

export default AdminPanel;
