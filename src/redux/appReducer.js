import { authThunk } from "./authReducer";

const SET_INITIALIZED = 'SET_INITIALIZED';

let initialState = {
    initialized: false
};

let appReducer = (state = initialState, action) => {
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

export const initializingSucces = () => ({
    type: SET_INITIALIZED
});


export const initializeThunk = () => {
    return async (dispatch) => {
        await dispatch(authThunk());
        dispatch(initializingSucces());
    }
};

export default appReducer;