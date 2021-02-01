import { applyMiddleware, combineReducers, compose, createStore } from "redux"
import authReducer from "./authReducer"
import dialogPageReducer from "./dialogPageReducer"
import profilePageReducer from "./profilePageReducer"
import usersPageReducer from "./usersPageReducer"
import thunkMiddleware from "redux-thunk"
import { reducer as formReducer} from "redux-form"
import appReducer from "./appReducer"



let rootReducer = combineReducers({
    dialogPage: dialogPageReducer,
    profilePage: profilePageReducer,
    usersPage: usersPageReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
})

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))

//let store = createStore(reducers, applyMiddleware(thunkMiddleware))

//@ts-ignore
window.__store__ = store

export default store