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
            debugger;
            let isAdmin = state.user.roles.some((role) => role.value === 'ADMIN' )
            return {...state, isUserAdmin: isAdmin}
        }
        default:{
            return state
        }
    }
}


export const setUser = (user) => ({ type:SET_USER, payload:{...user} })
export const setIsUserAdmin = () => ({ type: SET_IS_USER_ADMIN })


export default userReducer