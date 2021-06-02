import React from 'react';

import styled from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';
import { Form, Button, Input, Select, message } from 'antd';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../contexts/UserContext';
import { Restaurant, RestaurantType } from '../../RestaurantList';
import api from '../../../api';

// const { Option } = Select

const Main = styled.div`
    margin: 0 auto;
    max-width: 31rem;
`;

interface MatchParams {
    userId: string;
}

interface IState {
    restaurant?: Restaurant;
    isLoading: boolean;
    newType?: number;
    newName?: string;
    city?: string;
    // types: RestaurantType[]
    restaurantTypes: Array<RestaurantType>;
}

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

class ManageRestaurant extends React.Component<RouteComponentProps<MatchParams>, IState> {
    constructor(props: RouteComponentProps<MatchParams> & IState) {
        super(props);
        this.state = {
            restaurant: undefined,
            isLoading: true,
            newType: undefined,
            city: undefined,
            newName: undefined,
            restaurantTypes: new Array<RestaurantType>(),
        };
    }

    componentDidMount() {
        this.getRestaurant();
        this.getRestaurantTypes();
        this.getRestaurantAddress();
    }

    handleChangeName = (event: any) => {
        this.setState({
            newName: event.target.value,
        });
    };

    handleChangeCity = (event: any) => {
        this.setState({
            city: event.target.value,
        });
    };

    handleChangeType = (value: any) => {
        const newType = value;
        console.log(newType);
        this.setState({
            newType: newType,
        });
        if (this.state.restaurant) {
            const restaurantId = parseInt(this.state.restaurant.id, 10);
            try {
                api.setRestaurantType(restaurantId, newType);
                message.success('Zmieniono typ restauracji');
            } catch (e) {
                console.error(e);
            }
        }
    };

    setRestaurantName = async (id: any, newName: any) => {
        let normalizedName = newName.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        normalizedName = normalizedName.replace(/\u0142/g, 'l');
        await api.setRestaurantName(id, normalizedName);
        await this.getRestaurant();
    };

    setRestaurantAddress = async () => {
        try {
            const email = localStorage.getItem('email');
            if (email) {
                if (this.state.city) {
                    const resp = await api.getRestaurantForUserEmail(email);
                    const address = await api.getAddressByRestaurantId(resp.data.id);
                    let normalizedCity = this.state.city.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                    normalizedCity = normalizedCity.replace(/\u0142/g, 'l');
                    const newAddr = await api.addressPut(address.data.id, normalizedCity);
                    console.log(newAddr.data);
                }
            }
        } catch (e) {
            console.error(e);
        }
    };

    onFinish = () => {
        if (this.state.city) {
            try {
                this.setRestaurantAddress();
            } catch (e) {
                console.error(e);
            }
        }
        if (this.state.restaurant && this.state.newName) {
            const id = parseInt(this.state.restaurant.id, 10);
            const newName = this.state.newName;
            try {
                this.setRestaurantName(id, newName);
                this.setRestaurantAddress();
                message.success('Zapisano zmiany');
            } catch (e) {
                console.error(e);
            }
        }
    };

    createRestaurant = async () => {
        try {
            const email = localStorage.getItem('email');
            console.log(email);
            if (email) {
                const res = await api.createRestaurant(email);
                console.log(res.data);
                this.setState({
                    restaurant: res.data,
                });
            }
        } catch (e) {
            console.error(e);
        }
    };

    getRestaurantTypes = async () => {
        try {
            const res = await api.getAllRestaurantTypes();
            console.log(res.data);
            this.setState({
                restaurantTypes: res.data,
            });
        } catch (e) {
            console.error(e);
        }
    };

    getRestaurantAddress = async () => {
        try {
            const email = localStorage.getItem('email');
            if (email) {
                const res = await api.getRestaurantForUserEmail(email);
                const address = await api.getAddressByRestaurantId(res.data.id);
                console.log(address.data.cityName);
                this.setState({
                    city: address.data.cityName,
                });
            }
        } catch (e) {
            console.error(e);
        }
    };

    getRestaurant = async () => {
        try {
            const email = localStorage.getItem('email');
            if (email) {
                const res = await api.getRestaurantForUserEmail(email);
                console.log(res.data);
                this.setState({
                    restaurant: res.data,
                });
            }
        } catch (e) {
            console.error(e);
        }
    };

    render() {
        const types = this.state.restaurantTypes;

        const typesList = types.map((type) => {
            return (
                <option key={type.id} value={type.id}>
                    {type.displayName}
                </option>
            );
        });
        return (
            <UserContext.Consumer>
                {() => {
                    if (this.state.restaurant) {
                        return (
                            <Main>
                                <h1>
                                    Zarządzanie restauracją <b>{this.state.restaurant && this.state.restaurant.name}</b>
                                </h1>
                                <Form onFinish={this.onFinish}>
                                    <Form.Item label="Nazwa restauracji" name="restaurantname">
                                        <Input
                                            placeholder={this.state.restaurant.name}
                                            onChange={this.handleChangeName}
                                            type="text"
                                        />
                                    </Form.Item>
                                    <Form.Item label="Miasto restauracji" name="restaurantcity">
                                        <Input
                                            placeholder={this.state.city}
                                            onChange={this.handleChangeCity}
                                            type="text"
                                        />
                                    </Form.Item>
                                    <Form.Item {...tailLayout}>
                                        <Button type="primary" htmlType="submit">
                                            Zatwierdz
                                        </Button>
                                    </Form.Item>
                                </Form>
                                <Form>
                                    <Form.Item label="Rodzaj kuchni" name="restauranttype">
                                        <Select
                                            onChange={this.handleChangeType}
                                            placeholder={this.state.restaurant?.restaurantType.displayName}
                                        >
                                            {typesList}
                                        </Select>
                                    </Form.Item>
                                </Form>
                                <Link to="/manage-menu">
                                    <Button htmlType="submit">Zarządzaj menu</Button>
                                </Link>
                            </Main>
                        );
                    } else {
                        return (
                            <Main>
                                <RestaurationCreation createRestaurant={this.createRestaurant} />
                            </Main>
                        );
                    }
                }}
            </UserContext.Consumer>
        );
    }
}

const RestaurationCreation = (props: any) => {
    const [form] = Form.useForm();
    const { createRestaurant } = props;

    const onFinish = async (values: any) => {
        console.log('Wartosci formularza: ', values);
        await createRestaurant();
    };

    return (
        <div>
            <h1>Nie masz jeszcze restauracji</h1>
            <Form {...layout} form={form} name="createrestaurant" onFinish={onFinish} scrollToFirstError>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Stwórz restauracje
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ManageRestaurant;
