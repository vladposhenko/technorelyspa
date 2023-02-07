import {$authHost, $host} from "./index";


export const  getCompanies = async (page) => {
    const data = await $authHost.get('/companies/my', {params: { page: page, size: 6 }, })
    return data
}

export const createCompany = async (company) => {
    await $authHost.post('/companies', company)
}

export const updateCompany = async (company) => {
    const data = await $authHost.put('/companies', company)
    return data
}

export const getCompany = async (name) => {
    const data = await $authHost.get('/companies/' + name)
    return data
}

export const deleteCompany = async (id) => {
    const data = await $authHost.delete('/companies/' + id)
    return data
}