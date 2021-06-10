import axios from 'axios';
import { config } from '../Consts';

export const signin = (email: string, password: string) => {
    return axios.post(`${config.url.API_URL}/api/auth/login`, {
        username: email,
        password,
    });
};

export const signup = (email: string, password: string) => {
    const newUser = {
        username: email,
        email: email,
        password,
    };
    return axios.post(`${config.url.API_URL}/api/auth/signup`, newUser);
};
