import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Button } from 'antd';

import { Link } from 'react-router-dom';

import styled from 'styled-components';
import { getRestaurantMenuItemByMenuId, getRestaurantMenuId } from '../../../api/restaurants';

import routes from '../routes';
import ClientMenuItemList from './ClientMenuItemList';
import { MenuItem } from '../../../contexts/CartContext';
import ClientCartItemList from '../../ClientCartItemList';
import { UserContext } from '../../../contexts/UserContext';

const Main = styled.div`
    margin: 0 auto;
    max-width: 31rem;
`;

const FloatingCart = styled.div`
    position: fixed;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034), 0 6.7px 5.3px rgba(0, 0, 0, 0.048),
        0 12.5px 10px rgba(0, 0, 0, 0.06), 0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
        0 100px 80px rgba(0, 0, 0, 0.12);
    background: rgb(250, 250, 250);
    padding: 0.5rem;
    border-radius: 0.25rem;
    max-height: 70vh;
    overflow: scroll;
`;

interface MatchParams {
    id: string;
}

const initialState = {
    menuItems: Array<MenuItem>(),
    qty: 0,
    menuId: 0,
    isLoading: true,
    name: '',
    type: '',
};

type State = Readonly<typeof initialState>;

class BrowseRestaurantMenu extends React.Component<RouteComponentProps<MatchParams>, State> {
    readonly state: State = initialState;

    // constructor(props: RouteComponentProps<MatchParams> & State) {
    //   super(props)
    // }

    componentDidMount() {
        this.loadMenu();
    }

    loadMenu = async () => {
        try {
            let response = await getRestaurantMenuId(this.props.match.params.id);
            const menuId = response.data.id;

            response = await getRestaurantMenuItemByMenuId(menuId);
            const menuItems = response.data;

            this.setState({
                menuId: menuId,
                menuItems,
                isLoading: false,
            });
        } catch (e) {
            console.error(e);
        }
    };

    render() {
        return (
            <UserContext.Consumer>
                {(context) => {
                    const { isLoggedIn, isAdmin } = context;

                    return (
                        <div>
                            <Main>
                                <Link to="/">
                                    <Button>Powrót do strony głównej</Button>
                                </Link>
                                {this.state.isLoading ? (
                                    <p>Ładowanie</p>
                                ) : (
                                    <div>
                                        <h1>Restauracja {this.state.name}</h1>
                                        <h3>Menu:</h3>
                                        <ClientMenuItemList menuItems={this.state.menuItems} />
                                        {isLoggedIn ? (
                                            isAdmin ? (
                                                <Button>Zaloguj się jako zwykły użytkownik</Button>
                                            ) : (
                                                <Link to={routes.checkout}>
                                                    <Button type="primary">Przejdź do koszyka</Button>
                                                </Link>
                                            )
                                        ) : (
                                            <Link to={routes.signin}>
                                                <Button type="primary">Zaloguj się by zamówić</Button>
                                            </Link>
                                        )}
                                    </div>
                                )}
                            </Main>
                            <FloatingCart>
                                <h3>Koszyk</h3>
                                <ClientCartItemList />
                            </FloatingCart>
                        </div>
                    );
                }}
            </UserContext.Consumer>
        );
    }
}

export default BrowseRestaurantMenu;
