import {$authHost, $host} from "./index";
import jwt_decode from 'jwt-decode'


export const login = async (email, password) => {
    const { data } = await $host.post('auth/signin', {email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const register = async (newUser) => {
    const { data } = await $host.post('auth/signup', newUser)
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
    const { data } = await $authHost.get('/auth')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const update = async (updatedUser) => {
    const { data } = await  $authHost.put('/users', updatedUser)
    return data
}