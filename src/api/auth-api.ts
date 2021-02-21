import { instance, ResultCodeForCaptchaEnum, ResultCodesEnum } from "../API"
import { ResponseType } from "../types/type"

type MeResponseDataType = {
    id: number
    email: string
    login: string
}
type LoginMeResponseDataType = {
    userId: number
    email: string
    login: string
}


export const authAPI = {
    getAuth() {
        return instance.get<ResponseType<MeResponseDataType>>(`auth/me`).then(res => res.data);
    },
    login(email: string, password: string, rememberMe: boolean = false, captcha: string | null = null) {
        return instance.post<ResponseType<LoginMeResponseDataType, ResultCodesEnum | ResultCodeForCaptchaEnum>>(`auth/login`, { email, password, rememberMe, captcha }).then(res => res.data)
    },
    logout() {
        return instance.delete(`auth/login`).then(res => res.data);
    }
}