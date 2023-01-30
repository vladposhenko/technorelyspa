const SET_USER = 'SET_USER'
const SET_IS_USER_ADMIN = 'SET_IS_USER_ADMIN'

const initialState = {
    user:{},
    isUserAdmin:false
}


const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:{
            return {...state, user: action.payload}
        }
        case SET_IS_USER_ADMIN:{
            let isAdmin = state.user.roles.some((role) => role.value === 'ADMIN' )
            return {...state, isUserAdmin: action.payload ? action.payload : isAdmin}
        }
        default:{
            return state
        }
    }
}


export const setUser = (user) => ({ type:SET_USER, payload:{...user} })
export const setIsUserAdmin = (isUserAdmin) => ({ type: SET_IS_USER_ADMIN, payload:isUserAdmin})


export default userReducer