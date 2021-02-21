import { instance } from "../API"
import { ResponseType } from "../types/type"


export const followAPI = {
    follow(userID: number) {
        return instance.post<ResponseType>(`follow/${userID}`).then(res => res.data)
    },
    unfollow(userID: number) {
        return instance.delete(`follow/${userID}`).then(res => res.data) as Promise<ResponseType>
    }
}