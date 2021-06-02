import axios from 'axios'
import { config } from '../Consts'

export const getUserDataByEmail = async (email: string) => {

    return axios.get(`${config.url.API_URL}/api/users/${email}`)
}