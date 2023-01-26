import {getCompanies, getUsers} from "../http/adminApi";

const SET_USERS = 'SET_USERS'
const SET_ALL_COMPANIES = 'SET_ALL_COMPANIES'

const initialState = {
    users:[],
    companies:[]
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
        default:{
            return state
        }
    }
}


export const setUsers = (users) => ({ type:SET_USERS, payload: users })
export const setAllCompanies = (companies) => ({ type:SET_ALL_COMPANIES, payload: companies })

export const getAllUsers = () => async (dispatch) => {
    try {
        debugger;
        let response = await getUsers()
        dispatch(setUsers(response.data))
    } catch (e) {
        console.log(e)
    }
}

export const getAllCompanies = () => async (dispatch) => {
    try {
        debugger;
        let response = await getCompanies()
        dispatch(setAllCompanies(response.data))
    } catch (e) {
        console.log(e)
    }
}

export default adminReducer