import React from 'react'
import {
    NavLink
} from 'react-router-dom'
import { Menu, Layout, Dropdown } from 'antd'


import styled from 'styled-components'
import { UserContext } from '../contexts/UserContext'
import routes from './routes/routes'
const { Header } = Layout



const StyledHeader = styled(Header)`
    background: white;
`


const LeftMenu = styled(Menu)`
    float:left;
`


const RightMenu = styled(Menu)`
    float:right;
`

const UserMenu = () => (
    <Menu>
        <Menu.Item key="clientorders">
            <NavLink to={routes.history}>
                Historia zamówień klienta
            </NavLink>
        </Menu.Item>
        <Menu.Item key="restaurantorders">
            <NavLink to={routes.manageOrders}>
                Zamówienia restauracji
                </NavLink>
        </Menu.Item>
        <Menu.Item key="manageRestaurant">
            <NavLink to={routes.manageRestaurant}>
                Zarządzanie restauracją
                </NavLink>
        </Menu.Item>
        <Menu.Item key="signout">
            <NavLink to={routes.signout}>
                Wyloguj
            </NavLink>
        </Menu.Item>
    </Menu>
)



const AdminMenu = () => (
    <Menu>
        <Menu.Item key="adminPanel">
            <NavLink to={routes.adminPanel}>
                Panel Administratora
                </NavLink>
        </Menu.Item>
        <Menu.Item key="signout">
            <NavLink to={routes.signout}>
                Wyloguj
            </NavLink>
        </Menu.Item>
    </Menu>
)

class NavBar extends React.Component {

    render() {
        return (
            <UserContext.Consumer>{(context) => {
                const { isLoggedIn, isAdmin /*, isRestaurantOwner*/ } = context

                return (
                    <StyledHeader>
                        <LeftMenu mode="horizontal" defaultSelectedKeys={['logo']}>
                            <Menu.Item key="logo">
                                <NavLink to={routes.home}>
                                    ZJEDZ
                                </NavLink>
                            </Menu.Item>
                        </LeftMenu>
                        <RightMenu mode="horizontal">
                            {
                                isLoggedIn ?
                                    <Menu.Item>
                                        {
                                            isAdmin ?
                                                <Dropdown overlay={AdminMenu}>
                                                    <div>Konto</div>
                                                </Dropdown> :
                                                <Dropdown overlay={UserMenu}>
                                                    <div>Konto</div>
                                                </Dropdown>
                                        }
                                    </Menu.Item> :
                                    <Menu.Item>
                                        <NavLink to={routes.signin}>
                                            Zaloguj
                                        </NavLink>
                                    </Menu.Item>
                            }
                        </RightMenu>
                    </StyledHeader>
                )
            }}
            </UserContext.Consumer>
        )
    }
}

export default NavBar