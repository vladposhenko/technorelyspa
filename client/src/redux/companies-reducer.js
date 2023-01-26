import {createCompany, getCompanies, getCompany, updateCompany} from "../http/companiesApi";

const SET_COMPANIES = 'SET_COMPANIES'
const SET_IS_LOADING = 'SET_IS_LOADING'
const SET_CURRENT_COMPANY = 'SET_CURRENT_COMPANY'
const SET_EDIT_MODE = 'SET_EDIT_MODE'

const initialState = {
    companiesList:[],
    isLoading: false,
    currentCompany:{},
    isEditMode:false
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
        default:{
            return state
        }
    }
}


export const setCompanies = (companies) => ({ type:SET_COMPANIES, payload:companies })
export const setCurrentCompany = (company) => ({ type:SET_CURRENT_COMPANY, payload:company })
export const setIsEditMode = (isEditMode) => ({ type:SET_EDIT_MODE, payload:isEditMode })

export const getUserCompanies = () => async (dispatch) => {
    try {
        let response = await getCompanies()
        dispatch(setCompanies(response.data))
    } catch (e) {
        console.log(e)
    }
}

export const createUserCompany = (company) => async (dispatch) => {
    try {
        let response = await createCompany(company)
        dispatch(getUserCompanies())
    } catch (e) {
        console.log(e)
    }
}

export const updateUserCompany = (company) => async (dispatch) => {
    try {
        let response = await updateCompany(company)
        dispatch(getUserCompanies())
    } catch (e) {
        console.log(e)
    }
}

export const getCompanyByName = (name) => async (dispatch) => {
    try {
        let response = await getCompany(name)
        debugger
        dispatch(setCurrentCompany(response.data))
    } catch (e) {
        console.log(e)
    }
}

export default companiesReducer