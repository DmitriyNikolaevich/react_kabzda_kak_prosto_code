import { Action, applyMiddleware, combineReducers, compose, createStore } from "redux"
import authReducer from "./authReducer"
import dialogPageReducer from "./dialogPageReducer"
import profilePageReducer from "./profilePageReducer"
import usersPageReducer from "./usersPageReducer"
import thunkMiddleware, { ThunkAction } from "redux-thunk"
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


//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))


//@ts-ignore
window.__store__ = store


export default store


type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

type ProppertiesTypes<T> = T extends {[key: string]: infer U} ? U : never
export type InfernActionTypes<T extends {[key: string]: (...arg: any[]) => any}> = ReturnType<ProppertiesTypes<T>>

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>