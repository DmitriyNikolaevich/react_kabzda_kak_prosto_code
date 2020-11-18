import { stopSubmit } from "redux-form";
import { authAPI } from "../API";

const SET_USER_DATA = 'SET_USER_DATA';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
};

let authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data
            }

        default:
            return state;
    }
}

export const setAuthData = (userId, email, login, isAuth) => ({
    type: SET_USER_DATA, data: { userId, email, login, isAuth }
});


export const authThunk = () => {
    return async (dispatch) => {
        const response = await authAPI.getAuth();
        if (response.data.resultCode === 0) {
            dispatch(setAuthData(response.data.data.id, response.data.data.email, response.data.data.login, true));
        }
    }
}

export const login = (email, password, rememberMe) => {
    return async (dispatch) => {
         let response = await authAPI.login(email, password, rememberMe);
                if (response.data.resultCode === 0) {
                    dispatch(authThunk());    //response.data.data.id, response.data.data.email, response.data.data.login
                } else {
                    alert(response.data.messages[0])
                    let message = response.data.messages.lenght > 0 ? response.data.messages : "Some error";
                    dispatch(stopSubmit("login", { _error: message }))
                }
    }
}

export const logout = () => {
    return async (dispatch) => {
        let response = await authAPI.logout();
        if (response.data.resultCode === 0) {
            dispatch(setAuthData(null, null, null, false));
        }
    }
}

export default authReducer;