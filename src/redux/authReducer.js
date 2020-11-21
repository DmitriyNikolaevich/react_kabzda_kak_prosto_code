import { stopSubmit } from "redux-form";
import { authAPI, sequrityAPI } from "../API";

const SET_USER_DATA = 'SET_USER_DATA';
const SET_CAPTCHA_URL = 'SET_CAPTCHA_URL';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaURL: null
};

let authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
        case SET_CAPTCHA_URL:
            return {
                ...state,
                ...action.payload
            }

        default:
            return state;
    }
}

export const setAuthData = (userId, email, login, isAuth) => ({
    type: SET_USER_DATA, payload: { userId, email, login, isAuth }
});
export const setCaptchaURL = (captchaURL) => ({
    type: SET_CAPTCHA_URL, payload: {captchaURL}
});



export const authThunk = () => {
    return async (dispatch) => {
        const response = await authAPI.getAuth();
        if (response.data.resultCode === 0) {
            dispatch(setAuthData(response.data.data.id, response.data.data.email, response.data.data.login, true));
        }
    }
}

export const login = (email, password, rememberMe, captcha) => {
    return async (dispatch) => {
         let response = await authAPI.login(email, password, rememberMe, captcha);
                if (response.data.resultCode === 0) {
                    dispatch(authThunk());
                } else {
                    if (response.data.resultCode === 10) {
                        dispatch(getCaptcha()); 
                    }
                    let message = response.data.messages.lenght > 0 ? response.data.messages : "Some error";
                    dispatch(stopSubmit("login", { _error: message }))
                }
    }
}

export const getCaptcha = () => {
    return async (dispatch) => {
        const response = await sequrityAPI.getCaptcha();
        const captchaURL = response.data.url;

        dispatch(setCaptchaURL(captchaURL));
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