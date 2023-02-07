import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import authReducer from "./auth-reducer";
import thunkMiddleware from "redux-thunk";
import userReducer from "./user-reducer";
import companiesReducer from "./companies-reducer";
import adminReducer from "./admin-reducer";


let reducers = combineReducers({
    auth:authReducer,
    user:userReducer,
    companies: companiesReducer,
    admin:adminReducer
})

// CONNECTING REDUX DEV TOOLS
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)))

export default store