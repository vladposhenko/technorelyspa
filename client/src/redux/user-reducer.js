import {update} from "../http/userApi";


// ACTIONS
const SET_USER = 'SET_USER'
const SET_IS_USER_ADMIN = 'SET_IS_USER_ADMIN'
const SET_IS_PROFILE_EDITING = 'SET_IS_PROFILE_EDITING'
const UPDATE_PROFILE = 'UPDATE_PROFILE'


// INITIAL_STATE
const initialState = {
    user:{},
    isUserAdmin:false,
    isProfileEditing:false
}


// REDUCER
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
            let updatedUser = action.payload;
            return {...state, user: { ...state.user, ...updatedUser }}
        }
        default:{
            return state
        }
    }
}


// ACTION CREATORS
export const setUserSuccess = (user) => ({ type:SET_USER, payload:{...user} })
export const setIsUserAdmin = (user) => ({ type: SET_IS_USER_ADMIN, payload:user})
export const updateProfileSuccess = (updatedProfile) => ({type: UPDATE_PROFILE, payload: updatedProfile})


// THUNKS
export const updateUserProfile = (updatedProfile) => async (dispatch) => {
    try {
        let data = await update(updatedProfile)
        dispatch(updateProfileSuccess(data))
    } catch (e) {
        console.log(e)
    }
}

export default userReducer