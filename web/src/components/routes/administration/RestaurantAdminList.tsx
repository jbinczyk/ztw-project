import React, { useEffect, useState } from 'react';

import { message } from 'antd';
import styled from 'styled-components';
import { DeleteOutlined } from '@ant-design/icons';

import { List, Card, Avatar } from 'antd';
import api from '../../../api';
const { Meta } = Card;

interface RestaurantListProps {
    restaurants: Restaurant[];
}

// interface RestaurantProps {
//   restaurant: Restaurant
// }

export interface Restaurant {
    id: string;
    name: string;
    type: number;
    restaurantType: RestaurantType;
}

export interface RestaurantType {
    id: string;
    displayName: string;
}

const StyledCard = styled(Card)`
    width: 20rem;
`;

const RestaurantAdminList: React.FunctionComponent<RestaurantListProps> = () => {
    const [state, setState] = useState({
        restaurants: Array(),
    });

    const deleteRestaurant = async (id: number) => {
        try {
            await api.setRestaurantInvisible(id);
            await getRestaurants();
            message.success('Usunięto restaurację');
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        getRestaurants();
    }, []);

    const getRestaurants = async () => {
        try {
            const res = await api.getRestaurantsAll();
            console.log(res.data);
            setState({
                restaurants: res.data,
            });
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <List
            size="large"
            pagination={{
                onChange: (page) => {
                    console.log(page);
                },
                pageSize: 20,
            }}
            locale={{ emptyText: 'Brak restauracji' }}
            split={false}
            dataSource={state.restaurants}
            renderItem={(restaurant) => (
                <List.Item>
                    <StyledCard
                        loading={false}
                        actions={[
                            <DeleteOutlined
                                key="deleteMenuItem"
                                onClick={() => deleteRestaurant(Number(restaurant.id))}
                            />,
                        ]}
                    >
                        <Meta
                            avatar={
                                <Avatar src="https://ocs-pl.oktawave.com/v1/AUTH_876e5729-f8dd-45dd-908f-35d8bb716177/amrest-web-ordering/GRD4/GRD4590/Real%20Deal/pizzahut_szynka-1000x1000px.jpg" />
                            }
                            title={restaurant.name}
                            description={restaurant.restaurantType.displayName}
                        />
                    </StyledCard>
                </List.Item>
            )}
        />
    );
};

export default RestaurantAdminList;
