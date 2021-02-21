import { ThunkAction } from "redux-thunk"
import { authThunk } from "./authReducer"
import { AppStateType, InfernActionTypes } from "./reduxStore"

let initialState = {
    initialized: false
}

let appReducer = (state: InitialStateActionType = initialState, action: ActionsTypes): InitialStateActionType => {
    switch (action.type) {
        case 'SocNet/auth/SET_INITIALIZED':
            return {
                ...state,
                initialized: true
            }

        default:
            return state;
    }
}

const actions = {
    initializingSucces: () => ({type: 'SocNet/auth/SET_INITIALIZED'} as const)
}

export const initializeThunk = (): ThunkType => {
    return async (dispatch) => {
        await dispatch(authThunk())
        dispatch(actions.initializingSucces())
    }
}

export default appReducer


type InitialStateActionType = typeof initialState
type ActionsTypes = InfernActionTypes<typeof actions>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>