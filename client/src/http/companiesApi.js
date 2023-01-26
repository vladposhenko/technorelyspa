import {$authHost, $host} from "./index";
import jwt_decode from 'jwt-decode'



export const  getCompanies = async () => {
    const data = await $authHost.get('/companies/my')
    return data
}

export const createCompany = async (company) => {
    const data = await $authHost.post('/companies', company)
}

export const updateCompany = async (company) => {
    debugger;
    const data = await $authHost.put('/companies', company)
    return data
}

export const getCompany = async (name) => {
    const data = await $authHost.get('/companies/' + name)
    return data
}