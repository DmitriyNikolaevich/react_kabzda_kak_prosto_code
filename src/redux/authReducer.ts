import { stopSubmit } from "redux-form"
import { authAPI, ResultCodeForCaptchaEnum, ResultCodesEnum, sequrityAPI } from "../API"

const SET_USER_DATA = 'SET_USER_DATA'
const SET_CAPTCHA_URL = 'SET_CAPTCHA_URL'

type InitialStateType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    captchaURL: string | null
}

type SetAuthDataActionPayloadType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}

type SetAuthDataActionType = {
    type: typeof SET_USER_DATA,
    payload: SetAuthDataActionPayloadType
}

type SetCaptchaURLActionPayloadType = {
    captchaURL: string | null
}

type SetCaptchaURLActionType = {
    type: typeof SET_CAPTCHA_URL
     payload: SetCaptchaURLActionPayloadType
}

type ActionType = SetCaptchaURLActionType | SetAuthDataActionType

let initialState: InitialStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaURL: null
}

let authReducer = (state: InitialStateType = initialState, action: ActionType) => {
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

export const setAuthData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthDataActionType => ({
    type: SET_USER_DATA, payload: { userId, email, login, isAuth }
})


export const setCaptchaURL = (captchaURL: string): SetCaptchaURLActionType => ({
    type: SET_CAPTCHA_URL, payload: {captchaURL}
})



export const authThunk = () => {
    return async (dispatch: any) => {
        const response = await authAPI.getAuth();
        if (response.resultCode === ResultCodesEnum.success) {
            dispatch(setAuthData(response.data.id, response.data.email, response.data.login, true));
        }
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => {
    return async (dispatch: any) => {
         let response = await authAPI.login(email, password, rememberMe, captcha);
                if (response.resultCode === ResultCodesEnum.success) {
                    dispatch(authThunk());
                } else {
                    if (response.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
                        dispatch(getCaptcha()); 
                    }
                    let message = response.messages.length > 0 ? response.messages : "Some error";
                    dispatch(stopSubmit("login", { _error: message }))
                }
    }
}

export const getCaptcha = () => {
    return async (dispatch: any) => {
        const response = await sequrityAPI.getCaptcha();
        const captchaURL = response.data.url;

        dispatch(setCaptchaURL(captchaURL));
    }
}

export const logout = () => {
    return async (dispatch: any) => {
        let response = await authAPI.logout();
        if (response.resultCode === ResultCodesEnum.success) {
            dispatch(setAuthData(null, null, null, false));
        }
    }
}

export default authReducer