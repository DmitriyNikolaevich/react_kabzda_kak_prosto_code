import Axios from "axios"


export enum ResultCodesEnum {
    success = 0,
    error = 1
}
export enum ResultCodeForCaptchaEnum {
    CaptchaIsRequired = 10
}


export const instance = Axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "f747db5e-dcb5-4b79-a43c-812e564ac23b"
    }
})