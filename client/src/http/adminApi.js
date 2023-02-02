import {$authHost} from "./index";

export const getUsers = async (page) => {
    const data = await $authHost.get('/users', {params: { page: page, size: 6 }, })
    return data
}

export const getCompanies = async (page) => {
    const data = await $authHost.get('/companies', {params: { page: page, size: 6 }, })
    return data
}

export const getOneUser = async (id) => {
    const data = await $authHost.get('/users/' + id)
    return data
}

export const updateAdminUser = async (id, updatedUser) => {
    const {data} = await  $authHost.put('/users/admin/' + id, updatedUser)
    return data
}

export const getOneCompany = async (name) => {
    debugger;
    const data = await $authHost.get('/companies/admin/' + name)
    return data
}