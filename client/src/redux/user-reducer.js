import {update} from "../http/userApi";

const SET_USER = 'SET_USER'
const SET_IS_USER_ADMIN = 'SET_IS_USER_ADMIN'
const SET_IS_PROFILE_EDITING = 'SET_IS_PROFILE_EDITING'
const UPDATE_PROFILE = 'UPDATE_PROFILE'

const initialState = {
    user:{},
    isUserAdmin:false,
    isProfileEditing:false
}


const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:{
            return {...state, user: action.payload}
        }
        case SET_IS_USER_ADMIN:{
            let isAdmin = action.payload.roles.some((role) => role.value === 'ADMIN' )
            return {...state, isUserAdmin: isAdmin}
        }
        case SET_IS_PROFILE_EDITING: {
            return {...state, isProfileEditing: action.payload}
        }
        case UPDATE_PROFILE: {
            debugger;
            let updatedUser = action.payload;
            return {...state, user: { ...state.user, ...updatedUser }}
        }
        default:{
            return state
        }
    }
}


export const setUser = (user) => ({ type:SET_USER, payload:{...user} })
export const setIsUserAdmin = (user) => ({ type: SET_IS_USER_ADMIN, payload:user})
export const setIsProfileEditing = (isProfileEditing) => ({ type: SET_IS_USER_ADMIN, payload:isProfileEditing})
export const updateProfile = (updatedProfile) => ({type: UPDATE_PROFILE, payload: updatedProfile})


export const updateUserProfile = (updatedProfile) => async (dispatch) => {
    try {
        let data = await update(updatedProfile)
        dispatch(updateProfile(data))
    } catch (e) {
        console.log(e)
    }
}

export default userReducer