import {$authHost} from "./index";

export const getUsers = async () => {
    const data = await $authHost.get('/users')
    return data
}

export const getCompanies = async () => {
    const data = await $authHost.get('/companies')
    return data
}