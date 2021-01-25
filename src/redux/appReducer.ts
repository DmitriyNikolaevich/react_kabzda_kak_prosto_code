import { authThunk } from "./authReducer";

const SET_INITIALIZED = 'SET_INITIALIZED';

type InitialStateActionType = {
    initialized: boolean
}

type ActionCreatorType = {
    type: string
}

let initialState: InitialStateActionType = {
    initialized: false
};

let appReducer = (state: object = initialState, action: any) => {
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
});


export const initializeThunk = () => {
    return async (dispatch: any) => {
        await dispatch(authThunk());
        dispatch(initializingSucces());
    }
};

export default appReducer;