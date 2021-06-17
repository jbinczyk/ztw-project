import React, { createContext } from 'react';
import api from '../api';
import { message } from 'antd';

const initialState = {
    isLoggedIn: false,
    isAdmin: false,
    isRestaurantOwner: false,
    userId: '',
    token: '',
    email: '',
    firstName: '',
    lastName: '',
    isCompany: false,
    companyName: '',
    signIn: async (email: string, password: string) => {
        console.log(`${email} ${password}`);
    },
    signUp: async (email: string, password: string) => {
        console.log(`${email} ${password}`);
    },
    signOut: () => {},
    loadUserData: async () => {},
};

type State = Readonly<typeof initialState>;

export const UserContext = createContext(initialState);

class UserContextProvider extends React.Component<{ children: any }> {
    readonly state: State = initialState;

    signIn = async (email: string, password: string) => {
        try {
            const res = await api.signin(email, password);
            if (res.data === '') {
                message.error('Błędne dane logowania');
            } else {
                console.log(res.data);
                localStorage.setItem('token', res.data.authenticationToken);
                localStorage.setItem('email', email);
                await this.loadUserData();
                // USTAWIANIE DANYCH
                this.setState({
                    isLoggedIn: true,
                    email: email,
                    token: res.data.authenticationToken,
                });
                message.success('Zalogowano');
            }
        } catch (e) {
            console.error(e);
        }
    };

    signUp = async (email: string, password: string) => {
        try {
            const res = await api.signup(email, password);
            console.log(res);
            if (res.data.email === email) {
                message.success('Zarejestrowano');
            } else {
                message.error('Adres email już jest w bazie');
            }
        } catch (e) {
            console.error(e);
        }
    };

    signOut = () => {
        this.setState({
            isLoggedIn: false,
        });
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        message.success('Wylogowano');
    };

    loadUserData = async () => {
        const email = localStorage.getItem('email');
        if (email) {
            try {
                const res = await api.getUserDataByEmail(email);
                this.setState({
                    userId: res.data.id,
                    firstName: res.data.firstName,
                    lastName: res.data.surname,
                    isAdmin: res.data.isAdmin,
                    isRestaurantOwner: res.data.isRestaurantOwner,
                });
            } catch (e) {
                console.error(e);
            }
        }
    };

    componentDidMount = () => {
        this.setState({
            ...this.state,

            signIn: this.signIn,
            signUp: this.signUp,
            signOut: this.signOut,
        });
    };

    render() {
        return <UserContext.Provider value={{ ...this.state }}>{this.props.children}</UserContext.Provider>;
    }
}

export default UserContextProvider;
