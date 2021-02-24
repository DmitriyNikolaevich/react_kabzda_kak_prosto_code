import { instance } from "../API"
import { GetedUserType } from "../types/type"

type GetUsersItems = {
    items: Array<GetedUserType>
    totalCount: number
    error: string | null
}

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10, term: string = '') {
        return instance.get<GetUsersItems>(`users?page=${currentPage}&count=${pageSize}&term=${term}`)
            .then(response => {
                return response.data
            })
    }
}