import {check, login, register} from '../http/userApi'
import {setIsUserAdmin, setUser} from "./user-reducer";

const SET_IS_AUTH = 'SET_IS_AUTH'
const SET_USER = 'SET_USER'
const SET_AUTH_ERROR = 'SET_AUTH_ERROR'
const SET_IS_LOADING = 'SET_IS_LOADING'
const SET_USER_LOGOUT = 'SET_USER_LOGOUT'

const initialState = {
    isAuth:false,
    user:null,
    error:'',
    isLoading:false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_IS_AUTH: {
            return {
                ...state,
                isAuth: action.payload
            }
        }
        case SET_USER: {
            return {
                ...state,
                user:action.payload
            }
        }
        case SET_AUTH_ERROR: {
            debugger;
            return { ...state, error: action.payload }
        }
        case SET_IS_LOADING: {
            return { ...state, isLoading: !state.isLoading}
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



export const setAuth = (isAuth) => ({ type:SET_IS_AUTH, payload: isAuth})
export const setIsLoading = () => ({ type:SET_IS_LOADING })
export const setUserLogOut = () => ({ type:SET_USER_LOGOUT })
// export const setUser = (user) => ({ type:SET_USER, payload:{...user} })
export const setAuthError = (error) => ({ type:SET_AUTH_ERROR, payload:error })

// THUNKS

export const loginThunk = (email, password) => async (dispatch) => {
    try {
        dispatch(setIsLoading())
        let response = await login(email, password)
        dispatch(setAuth(true))
        dispatch(setUser(response))
        dispatch(setIsUserAdmin())
        dispatch(setIsLoading())
    } catch (e) {
        dispatch(setAuthError(e.response.data.message))
        dispatch(setIsLoading())
    }
}

export const registrationThunk = (newUser) => async (dispatch) => {
    try {
        dispatch(setIsLoading())
        let response = await register(newUser)
        dispatch(setAuth(true))
        dispatch(setUser(response))
        dispatch(setIsLoading())
    } catch (e) {
        dispatch(setAuthError(e.response.data.message))
        dispatch(setIsLoading())
    }
}

export const checkThunk = () => async (dispatch) => {
    try {
        dispatch(setIsLoading())
        let response = await check()
        dispatch(setAuth(true))
        dispatch(setUser(response))
        dispatch(setIsUserAdmin())
        dispatch(setIsLoading())
    } catch (e) {
        console.log(e)
    }
}



export default authReducer