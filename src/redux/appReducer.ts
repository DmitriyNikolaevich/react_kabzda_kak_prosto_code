import { authThunk } from "./authReducer";

const SET_INITIALIZED = 'SET_INITIALIZED';

type InitialStateActionType = {
    initialized: boolean
}

type ActionTyps = ActionCreatorType

type ActionCreatorType = {
    type: typeof SET_INITIALIZED
}

let initialState: InitialStateActionType = {
    initialized: false
}

let appReducer = (state: InitialStateActionType = initialState, action: ActionTyps): InitialStateActionType => {
    switch (action.type) {
        case SET_INITIALIZED:
            return {
                ...state,
                initialized: true
            }

        default:
            return state;
    }
}

export const initializingSucces = (): ActionCreatorType => ({
    type: SET_INITIALIZED
})


export const initializeThunk = () => {
    return async (dispatch: any) => {
        await dispatch(authThunk());
        dispatch(initializingSucces());
    }
}

export default appReducer;