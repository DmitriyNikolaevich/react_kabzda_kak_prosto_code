import { instance } from "../API"
import { GetedUserType } from "../types/type"

type GetUsersItems = {
    items: Array<GetedUserType>
    totalCount: number
    error: string | null
}

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get<GetUsersItems>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    }
}