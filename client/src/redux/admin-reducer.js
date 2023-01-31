import {getCompanies, getOneUser, getUsers} from "../http/adminApi";
import {setIsLoading} from "./auth-reducer";

// ACTIONS
const SET_USERS = 'SET_USERS'
const SET_ALL_COMPANIES = 'SET_ALL_COMPANIES'
const SET_TOTAL_COUNT_USERS = 'SET_TOTAL_COUNT_USERS'
const SET_TOTAL_COUNT_COMPANIES = 'SET_TOTAL_COUNT_COMPANIES'
const SET_CURRENT_USER = 'SET_CURRENT_USER'

const initialState = {
    users:[],
    companies:[],
    totalCountOfUsers:0,
    totalCountOfCompanies:0,
    currentUser:null
}

// REDUCER
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
        case SET_CURRENT_USER: {
            return {...state, currentUser: action.payload}
        }
        default:{
            return state
        }
    }
}

// ACTION CREATORS

export const setUsers = (users) => ({ type:SET_USERS, payload: users })
export const setAllCompanies = (companies) => ({ type:SET_ALL_COMPANIES, payload: companies })
export const setTotalCountUsers = (count) => ({ type:SET_TOTAL_COUNT_USERS, payload: count })
export const setTotalCountCompanies = (count) => ({ type:SET_TOTAL_COUNT_COMPANIES, payload: count })
export const setCurrentUser = (user) => ({ type:SET_CURRENT_USER, payload: user })


// THUNKS
export const getAllUsers = (page) => async (dispatch) => {
    try {
        dispatch(setIsLoading(true))
        let { data } = await getUsers(page)
        dispatch(setTotalCountUsers(data.total))
        dispatch(setUsers(data.users))
        dispatch(setIsLoading(false))
    } catch (e) {
        console.log(e)
    }
}

export const getAllCompanies = (page) => async (dispatch) => {
    try {
        dispatch(setIsLoading(true))
        let { data } = await getCompanies(page)
        dispatch(setTotalCountCompanies(data.total))
        dispatch(setAllCompanies(data.companies))
        dispatch(setIsLoading(false))
    } catch (e) {
        console.log(e)
    }
}

export const getOneUserThunk = (id) => async (dispatch) => {
    try {
        dispatch(setIsLoading(true))
        let {data} = await getOneUser(id)
        dispatch(setCurrentUser(data))
        dispatch(setIsLoading(false))
    } catch (e) {
        console.log(e)
    }
}

export default adminReducer