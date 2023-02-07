import {check, login, register} from '../http/userApi'
import {setIsUserAdmin, setUserSuccess} from "./user-reducer";
import {setAllCompanies, setUsers} from "./admin-reducer";
import {setCompaniesSuccess, setCurrentCompanySuccess, setIsEditMode} from "./companies-reducer";

// ACTIONS
const SET_IS_AUTH = 'SET_IS_AUTH'
const SET_AUTH_ERROR = 'SET_AUTH_ERROR'
const SET_IS_LOADING = 'SET_IS_LOADING'
const SET_USER_LOGOUT = 'SET_USER_LOGOUT'


// INITIAL_STATE
const initialState = {
    isAuth:false,
    serverError:'',
    isLoading:false
}


// REDUCER
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_IS_AUTH: {
            return {
                ...state,
                isAuth: action.payload
            }
        }
        case SET_AUTH_ERROR: {
            return { ...state, serverError: action.payload }
        }
        case SET_IS_LOADING: {
            return { ...state, isLoading: action.payload}
        }
        case SET_USER_LOGOUT: {
            return {
                ...state,
                user:null,
                isAuth: false
            }
        }
        default:
            return state
    }
}


// ACTION CREATORS
export const setAuthSuccess = (isAuth) => ({ type:SET_IS_AUTH, payload: isAuth})
export const setIsLoading = (isLoading) => ({ type:SET_IS_LOADING, payload:isLoading })
export const setAuthErrorFailure = (error) => ({ type:SET_AUTH_ERROR, payload:error })


// THUNKS
export const logOutThunk = () => async (dispatch) => {
    try {
        await localStorage.removeItem('token')
        dispatch(setAuthSuccess(false))
        dispatch(setUsers(null))
        dispatch(setAllCompanies(null))
        dispatch(setCompaniesSuccess(null))
        dispatch(setCurrentCompanySuccess(null))
        dispatch(setIsEditMode(false))
        dispatch(setIsUserAdmin(false))
    } catch (e) {
        console.log(e)
    }
}

export const loginThunk = (email, password) => async (dispatch) => {
    try {
        dispatch(setIsLoading(true))
        let response = await login(email, password)
        dispatch(setAuthSuccess(true))
        dispatch(setUserSuccess(response))
        dispatch(setIsUserAdmin(response))
        dispatch(setIsLoading(false))
    } catch (e) {
        dispatch(setAuthErrorFailure(e.response.data.message))
        dispatch(setIsLoading())
    }
}

export const registrationThunk = (newUser) => async (dispatch) => {
    try {
        dispatch(setIsLoading(true))
        let response = await register(newUser)
        dispatch(setAuthSuccess(true))
        dispatch(setUserSuccess(response))
        dispatch(setIsUserAdmin(response))
        dispatch(setIsLoading(false))
    } catch (e) {
        dispatch(setAuthErrorFailure(e.response.data.message || e.response.data))
        dispatch(setIsLoading(false))
    }
}

export const checkThunk = () => async (dispatch) => {
    try {
        dispatch(setIsLoading(true))
        let response = await check()
        dispatch(setAuthSuccess(true))
        dispatch(setUserSuccess(response))
        dispatch(setIsUserAdmin(response))
        dispatch(setIsLoading(false))
    } catch (e) {
        console.log(e)
        dispatch(setIsLoading(false))
    }
}



export default authReducer