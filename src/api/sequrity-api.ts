import { instance } from "../API"

type GetCaptchaResponseType = {
    url: string
}

export const sequrityAPI = {
    getCaptcha() {
        return instance.get<GetCaptchaResponseType>( `security/get-captcha-url` )
    }
}