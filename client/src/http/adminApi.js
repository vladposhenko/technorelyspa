import {$authHost} from "./index";

export const getUsers = async (page) => {
    const data = await $authHost.get('/users', {params: { page: page, size: 6 }, })
    return data
}

export const getCompanies = async (page) => {
    const data = await $authHost.get('/companies', {params: { page: page, size: 6 }, })
    return data
}