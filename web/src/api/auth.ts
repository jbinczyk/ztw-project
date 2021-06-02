import axios from 'axios'
import { config } from '../Consts'

export const signin = (email: string, password: string) => {
    return axios.post(`${config.url.API_URL}/auth`,
        {
            email, password
        }
    )
}


export const signup = (email: string, password: string) => {
    const newUser = {
        email,
        password
    }
    return axios.post(`${config.url.API_URL}/users`, newUser)
}