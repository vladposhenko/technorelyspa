import {createCompany, deleteCompany, getCompanies, getCompany, updateCompany} from "../http/companiesApi";
import {setIsLoading} from "./auth-reducer";

const SET_COMPANIES = 'SET_COMPANIES'
const SET_IS_LOADING = 'SET_IS_LOADING'
const SET_CURRENT_COMPANY = 'SET_CURRENT_COMPANY'
const SET_EDIT_MODE = 'SET_EDIT_MODE'
const DELETE_COMPANY = 'DELETE_COMPANY'
const SET_TOTAL_COUNT_MY_COMPANIES = 'SET_TOTAL_COUNT_MY_COMPANIES'


const initialState = {
    companiesList:[],
    isLoading: false,
    currentCompany:{},
    isEditMode:false,
    totalCountMyCompanies:0
}


const companiesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_COMPANIES:{
            const filtered = action.payload.sort((a, b) => a.id - b.id )
            return {...state, companiesList: filtered}
        }
        case SET_IS_LOADING:{
            return {...state, isLoading: action.payload}
        }
        case SET_CURRENT_COMPANY: {
            return {...state, currentCompany: action.payload}
        }
        case SET_EDIT_MODE: {
            return {...state, isEditMode: action.payload}
        }
        case DELETE_COMPANY : {
            let companiesList = state.companiesList.filter(c => c.id !== action.payload)
            return {...state, companiesList}
        }
        case SET_TOTAL_COUNT_MY_COMPANIES: {
            return {...state, totalCountMyCompanies: action.payload}
        }
        default:{
            return state
        }
    }
}

// ACTION CREATORS
export const setCompaniesSuccess = (companies) => ({ type:SET_COMPANIES, payload:companies })
export const setCurrentCompanySuccess = (company) => ({ type:SET_CURRENT_COMPANY, payload:company })
export const setIsEditMode = (isEditMode) => ({ type:SET_EDIT_MODE, payload:isEditMode })
export const setTotalCountMyCompaniesSuccess = (count) => ({ type:SET_TOTAL_COUNT_MY_COMPANIES, payload:count })
export const deleteMyCompanySuccess = (id) => ({ type:DELETE_COMPANY, payload:id })


// THUNKS
export const getUserCompanies = (page) => async (dispatch) => {
    try {
        dispatch(setIsLoading(true))
        let { data } = await getCompanies(page)
        dispatch(setCompaniesSuccess(data.users))
        dispatch(setTotalCountMyCompaniesSuccess(data.total))
        dispatch(setIsLoading(false))
    } catch (e) {
        console.log(e)
    }
}

export const createUserCompany = (company) => async (dispatch) => {
    try {
        dispatch(setIsLoading(true))
        await createCompany(company)
        dispatch(getUserCompanies())
        dispatch(setIsLoading(false))
    } catch (e) {
        alert(e.response.data.message)
    }
}

export const updateUserCompany = (company) => async (dispatch) => {
    try {
        dispatch(setIsLoading(true))
        await updateCompany(company)
        dispatch(getUserCompanies())
        dispatch(setIsLoading(false))
    } catch (e) {
        alert(e.response.data.message)
    }
}

export const getCompanyByName = (name) => async (dispatch) => {
    try {
        dispatch(setIsLoading(true))
        let { data } = await getCompany(name)
        dispatch(setCurrentCompanySuccess(data))
        dispatch(setIsLoading(false))
    } catch (e) {
        alert(e.response.data.message)
        dispatch(setIsLoading(false))
    }
}

export const deleteMyCompany = (id) => async (dispatch) => {
    try {
        debugger;
        dispatch(setIsLoading(true))
        await deleteCompany(id)
        dispatch(deleteMyCompanySuccess(id))
        dispatch(setIsLoading(false))
    } catch (e) {
        console.log(e)
    }
}

export default companiesReducer