import Axios from "axios"
import { ProfileType, UserType } from "./types/type"


type MeResponseType = {
    data: { 
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodesEnum
    messages: Array<string>
}
type LoginMeResponseType = {
    data: { 
        userId: number
        email: string
        login: string
    }
    resultCode: ResultCodesEnum | ResultCodeForCaptchaEnum
    messages: Array<string>
}
type DeleteMeResponseType = {
    data: Object
    resultCode: ResultCodesEnum
    messages: Array<string>
}
type FollowType = {
    resultCode: ResultCodesEnum
    messages: Array<string>
    data: Object
}
type UnfollowType = {
    resultCode: ResultCodesEnum
    messages: Array<string>
    data: Object
}



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



export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    }
}
export const followAPI = {
    follow(userID: number) {
        return instance.post<FollowType>(`follow/${userID}`)
    },
    unfollow(userID: number) {
        return instance.delete<UnfollowType>(`follow/${userID}`)
    }
}
export const authAPI = {
    getAuth() {
        return instance.get<MeResponseType>(`auth/me`).then(res => res.data);
    },
    login(email: string, password: string, rememberMe: boolean = false, captcha: string| null = null) {
        return instance.post<LoginMeResponseType>(`auth/login`, {email, password, rememberMe, captcha}).then(res => res.data)
    },
    logout() {
        return instance.delete<DeleteMeResponseType>(`auth/login`).then(res => res.data);
    }
}
export const profileAPI = {
    getUser(userId: number) {
        return instance.get<UserType>( `profile/${userId}` );
    },
    getStatus(userId: number) {
        return instance.get<string>( `profile/status/${userId}` )
    },
    updateStatus(status: string) {
        return instance.put(`profile/status`, { 'status': status } )
    },
    savePhoto(file: any) {
        const formData = new FormData();
        formData.append('image', file);
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfileData(profileData: ProfileType) {
        return instance.put('profile', profileData);
    }
}
export const sequrityAPI = {
    getCaptcha() {
        return instance.get( `security/get-captcha-url` );
    }
}