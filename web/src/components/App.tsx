import React, { Fragment } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import styled from 'styled-components';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/react-hooks';

import { Layout } from 'antd';

import PrivateRoute from '../components/PrivateRoute';
import NavBar from '../components/NavBar';
import UserContextProvider, { UserContext } from '../contexts/UserContext';
import Signup from './routes/auth/Signup';
import Signin from './routes/auth/Signin';
import Signout from './routes/auth/Signout';
import Home from './routes/home/Home';
import Users from './routes/Users';
import BrowseRestaurants from './routes/browseRestaurants/BrowseRestaurants';
import BrowseRestaurantMenu from './routes/browseRestaurantMenu/BrowseRestaurantMenu';
import Summary from './routes/browseRestaurantMenu/Summary';
import ManageRestaurant from './routes/manageRestaurant/ManageRestaurant';
import ClientOrderHistory from './routes/clientOrderHistory/ClientOrderHistory';
import ClientOrderDetails from './routes/clientOrderHistory/ClientOrderDetails';
import ManageRestaurantOrder from './routes/manageRestaurantOrder/ManageRestaurantOrder';
import OrderDetails from './routes/manageRestaurantOrder/OrderDetails';
import ManageRestaurantMenu from './routes/manageRestaurantMenu/ManageRestaurantMenu';
import ManageMenuItem from './routes/manageMenuItem/ManageMenuItem';
import routes from './routes/routes';
import { config } from '../Consts';
import CartContextProvider from '../contexts/CartContext';
import AddMenuItem from './routes/manageMenuItem/AddMenuItem';
import AdminPanel from './routes/administration/AdminPanel';
import ManageRestaurantAdmin from './routes/administration/ManageRestaurantsAdmin';

const { Content, Footer } = Layout;

const client = new ApolloClient({
    uri: config.url.API_URL,
    cache: new InMemoryCache(),
});

const StyledContent = styled(Content)`
    /* padding: 3rem 0; */

    background: #4caf50;
`;

const StyledFooter = styled(Footer)`
    text-align: center;
    background: #339900;
    color: white;
    font-weight: bolder;
`;

const StyledLayout = styled(Layout)`
    background: #fff;
    /* padding: 2rem; */
    min-height: 100vh;
`;

function App() {
    return (
        <CartContextProvider>
            <UserContextProvider>
                <ApolloProvider client={client}>
                    <Layout>
                        <BrowserRouter>
                            <NavBar />
                            <StyledContent>
                                <StyledLayout>
                                    {/* KAZDY */}

                                    <Route path={routes.home} exact component={Home} />
                                    <Route path={routes.signup} component={Signup} />
                                    <Route path={routes.signin} component={Signin} />
                                    <Route path={routes.signout} component={Signout} />
                                    <Route path={routes.users} component={Users} />
                                    <Route path={routes.browse} component={BrowseRestaurants} />
                                    <Route path={routes.menu} component={BrowseRestaurantMenu} />
                                    <Route path={routes.historyOrderDetails} component={ClientOrderDetails} />
                                    <UserContext.Consumer>
                                        {(context) => {
                                            const { isLoggedIn /*, isAdmin*/ } = context;
                                            return (
                                                <Fragment>
                                                    <PrivateRoute
                                                        isAuthenticated={isLoggedIn}
                                                        isAllowed={isLoggedIn}
                                                        restrictedPath="/signin"
                                                        authenticationPath="/"
                                                        path={routes.manageRestaurant}
                                                        component={ManageRestaurant}
                                                    />
                                                    <PrivateRoute
                                                        isAuthenticated={isLoggedIn}
                                                        isAllowed={isLoggedIn}
                                                        restrictedPath="/signin"
                                                        authenticationPath="/"
                                                        path={routes.manageOrders}
                                                        exact
                                                        component={ManageRestaurantOrder}
                                                    />
                                                    <PrivateRoute
                                                        isAuthenticated={isLoggedIn}
                                                        isAllowed={isLoggedIn}
                                                        restrictedPath="/signin"
                                                        authenticationPath="/"
                                                        path={routes.orderDetailsRestaurant}
                                                        component={OrderDetails}
                                                    />
                                                    <PrivateRoute
                                                        isAuthenticated={isLoggedIn}
                                                        isAllowed={isLoggedIn}
                                                        restrictedPath="/signin"
                                                        authenticationPath="/"
                                                        path={routes.history}
                                                        exact
                                                        component={ClientOrderHistory}
                                                    />
                                                    <PrivateRoute
                                                        isAuthenticated={isLoggedIn}
                                                        isAllowed={isLoggedIn}
                                                        restrictedPath="/signin"
                                                        authenticationPath="/"
                                                        path={routes.manageMenu}
                                                        component={ManageRestaurantMenu}
                                                    />
                                                    <PrivateRoute
                                                        isAuthenticated={isLoggedIn}
                                                        isAllowed={isLoggedIn}
                                                        restrictedPath="/signin"
                                                        authenticationPath="/"
                                                        path={routes.manageMenuItem}
                                                        component={ManageMenuItem}
                                                    />
                                                    <PrivateRoute
                                                        isAuthenticated={isLoggedIn}
                                                        isAllowed={isLoggedIn}
                                                        restrictedPath="/signin"
                                                        authenticationPath="/"
                                                        path={routes.addMenuItem}
                                                        component={AddMenuItem}
                                                    />
                                                    <PrivateRoute
                                                        isAuthenticated={isLoggedIn}
                                                        isAllowed={isLoggedIn}
                                                        restrictedPath="/signin"
                                                        authenticationPath="/"
                                                        path={routes.manageRestaurantAdmin}
                                                        component={ManageRestaurantAdmin}
                                                    />
                                                    <PrivateRoute
                                                        isAuthenticated={isLoggedIn}
                                                        isAllowed={isLoggedIn}
                                                        restrictedPath="/signin"
                                                        authenticationPath="/"
                                                        path={routes.checkout}
                                                        component={Summary}
                                                    />
                                                    {/* Admin */}
                                                    {/* <PrivateRoute
                            isAuthenticated={isLoggedIn}
                            isAllowed={isAdmin === true}
                            restrictedPath='/signin'
                            authenticationPath='/'
                            path={routes.adminPanel} component={AdminPanel}
                          /> */}
                                                    <Route path={routes.adminPanel} component={AdminPanel} />
                                                </Fragment>
                                            );
                                        }}
                                    </UserContext.Consumer>
                                </StyledLayout>
                            </StyledContent>
                            <StyledFooter>ZJEDZ.site ©2020</StyledFooter>
                        </BrowserRouter>
                    </Layout>
                    {process.env.NODE_ENV}
                </ApolloProvider>
            </UserContextProvider>
        </CartContextProvider>
    );
}

export default App;
