import {getCompanies, getUsers} from "../http/adminApi";

const SET_USERS = 'SET_USERS'
const SET_ALL_COMPANIES = 'SET_ALL_COMPANIES'
const SET_TOTAL_COUNT_USERS = 'SET_TOTAL_COUNT_USERS'
const SET_TOTAL_COUNT_COMPANIES = 'SET_TOTAL_COUNT_COMPANIES'

const initialState = {
    users:[],
    companies:[],
    totalCountOfUsers:0,
    totalCountOfCompanies:0,
}


const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS:{
            return {...state, users: action.payload}
        }
        case SET_ALL_COMPANIES:{
            debugger;
            return {...state, companies: action.payload}
        }
        case SET_TOTAL_COUNT_USERS: {
            return {...state, totalCountOfUsers: action.payload}
        }
        case SET_TOTAL_COUNT_COMPANIES: {
            return {...state, totalCountOfCompanies: action.payload}
        }
        default:{
            return state
        }
    }
}


export const setUsers = (users) => ({ type:SET_USERS, payload: users })
export const setAllCompanies = (companies) => ({ type:SET_ALL_COMPANIES, payload: companies })
export const setTotalCountUsers = (count) => ({ type:SET_TOTAL_COUNT_USERS, payload: count })
export const setTotalCountCompanies = (count) => ({ type:SET_TOTAL_COUNT_COMPANIES, payload: count })

export const getAllUsers = (page) => async (dispatch) => {
    try {
        let { data } = await getUsers(page)
        dispatch(setTotalCountUsers(data.total))
        dispatch(setUsers(data.users))
    } catch (e) {
        console.log(e)
    }
}

export const getAllCompanies = (page) => async (dispatch) => {
    try {
        debugger;
        let { data } = await getCompanies(page)
        dispatch(setTotalCountCompanies(data.total))
        dispatch(setAllCompanies(data.companies))
    } catch (e) {
        console.log(e)
    }
}

export default adminReducer