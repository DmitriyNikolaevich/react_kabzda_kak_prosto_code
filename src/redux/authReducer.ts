import { FormAction, stopSubmit } from "redux-form"
import { ResultCodeForCaptchaEnum, ResultCodesEnum } from "../API"
import { authAPI } from "../api/auth-api"
import { sequrityAPI } from "../api/sequrity-api"
import { BaseThunkType, InfernActionTypes } from "./reduxStore"


let initialState: InitialStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaURL: null
}

let authReducer = (state: InitialStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case 'SocNet/auth/SET_USER_DATA':
        case 'SocNet/auth/SET_CAPTCHA_URL':
            return {
                ...state,
                ...action.payload
            }

        default:
            return state
    }
}

const actions = {
    setAuthData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: 'SocNet/auth/SET_USER_DATA', payload: { userId, email, login, isAuth } as const
    }),
    setCaptchaURL: (captchaURL: string) => ({
        type: 'SocNet/auth/SET_CAPTCHA_URL', payload: {captchaURL} as const
    })
}


export const authThunk = () => {
    return async (dispatch: any) => {
        const response = await authAPI.getAuth()
        if (response.resultCode === ResultCodesEnum.success) {
            dispatch(actions.setAuthData(response.data.id, response.data.email, response.data.login, true))
        }
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => {
    return async (dispatch) => {
         let response = await authAPI.login(email, password, rememberMe, captcha)
                if (response.resultCode === ResultCodesEnum.success) {
                    dispatch(authThunk())
                } else {
                    if (response.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
                        dispatch(getCaptcha())
                    }
                    let message = response.messages.length > 0 ? response.messages : "Some error"
                    dispatch(stopSubmit("login", { _error: message }))
                }
    }
}

export const getCaptcha = (): ThunkType => {
    return async (dispatch) => {
        const response = await sequrityAPI.getCaptcha();
        const captchaURL = response.data.url

        dispatch(actions.setCaptchaURL(captchaURL))
    }
}

export const logoutThunk = (): ThunkType => {
    return async (dispatch) => {
        let response = await authAPI.logout()
        if (response.resultCode === ResultCodesEnum.success) {
            dispatch(actions.setAuthData(null, null, null, false))
        }
    }
}

export default authReducer


type InitialStateType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    captchaURL: string | null
}

type ActionType = InfernActionTypes<typeof actions>

type ThunkType = BaseThunkType<ActionType | FormAction>