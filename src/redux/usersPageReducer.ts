import { Dispatch } from "react"
import { ThunkAction } from "redux-thunk"
import { followAPI } from "../api/follow-api"
import { usersAPI } from "../api/users-api"
import { GetedUserType } from "../types/type"
import { updateObjectInArray } from "../utils/objectHelper"
import { AppStateType, InfernActionTypes } from "./reduxStore"


type InitialState = {
    users: Array<GetedUserType>
    pageSize: number | null
    totalUsersCount: number | null
    currentPage: number | null
    isFetching: boolean
    progress: boolean
}


let initialState = {
    users: [] as Array<GetedUserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 2,
    isFetching: true,
    progress: false
}

type ActionType = InfernActionTypes<typeof actions>

let usersPageReducer = (state: InitialState = initialState, action: ActionType): InitialState => {
    switch (action.type) {
        case "FOLLOW":
            return {
                ...state,
                users: updateObjectInArray(state.users, action.usersID, "id", {followed: true})
            }

        case "UNFOLLOW":
            return {
                ...state,
                users: updateObjectInArray(state.users, action.usersID, "id", {followed: false})
            }

        case "SET_USERS":
            return { ...state, users: action.users }

        case "SET_CURRENT_PAGE":
            return { ...state, currentPage: action.currentPage }

        case "SET_TOTAL_COUNT":
            return { ...state, totalUsersCount: action.totalCount }

        case "SET_LOADER":
            return { ...state, isFetching: action.isFetching }

        case "FOLLOWING_IN_PROGRESS":
            return { ...state, progress: action.isFetching }

        default:
            return state
    }
}



export const actions = {
follow: (usersID: number) => ({
    type: 'FOLLOW', usersID
} as const),

unfollow: (usersID: number) => ({
    type: 'UNFOLLOW', usersID
} as const),

setUsers: (users: Array<GetedUserType>) => ({
    type: 'SET_USERS', users
} as const),

setCurrentPage: (currentPage: number) => ({
    type: 'SET_CURRENT_PAGE', currentPage
} as const),

setTotalCount: (totalCount: number) => ({
    type: 'SET_TOTAL_COUNT', totalCount
} as const),

setFetching: (isFetching: boolean) => ({
    type: 'SET_LOADER', isFetching
} as const),

inProgress: (isFetching: boolean) => ({
    type: 'FOLLOWING_IN_PROGRESS', isFetching
} as const)
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionType>
type DispatchType = Dispatch<ActionType>

export const getUsers = (currentPage: number, pageSize: number): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.setFetching(true));
        let data = await usersAPI.getUsers(currentPage, pageSize)
        dispatch(actions.setFetching(false))
        dispatch(actions.setUsers(data.items))
        dispatch(actions.setTotalCount(data.totalCount))
    }
}
export const onPageChenger = (pageNumber: number, pageSize: number): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.setFetching(true))
        dispatch(actions.setCurrentPage(pageNumber))
        let data = await usersAPI.getUsers(pageNumber, pageSize)
        dispatch(actions.setFetching(false))
        dispatch(actions.setUsers(data.items))
    }
}


const _followUnfollowFlow = async (dispatch: DispatchType, userID: number, apiMetod: any, actionCreator: (userID: number) => ActionType) => {
    dispatch(actions.inProgress(true));
        let response = await apiMetod(userID)
        if (response.data.resultCode === 0) {
            dispatch(actionCreator(userID))
        }
        dispatch(actions.inProgress(false))
}

export const unfollowThunk = (userID: number): ThunkType => {

    return async (dispatch) => {
        _followUnfollowFlow(dispatch, userID, followAPI.unfollow.bind(followAPI), actions.unfollow)
    }
}
export const followThunk = (userID: number): ThunkType => {

    return async (dispatch) => {
        _followUnfollowFlow(dispatch, userID, followAPI.follow.bind(followAPI), actions.follow)
    }
}

export default usersPageReducer