//import { AppStateType } from './reduxStore';
//import { Dispatch } from "redux"
import { Dispatch } from "react"
import { ThunkAction } from "redux-thunk"
import { followAPI, usersAPI } from "../API"
import { GetedUserType } from "../types/type"
import { updateObjectInArray } from "../utils/objectHelper"
import { AppStateType } from "./reduxStore"
//import { ThunkAction } from 'redux-thunk'

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT'
const SET_LOADER = 'SET_LOADER'
const FOLLOWING_IN_PROGRESS = 'FOLLOWING_IN_PROGRESS'

type InitialState = {
    users: Array<GetedUserType>
    pageSize: number | null
    totalUsersCount: number | null
    currentPage: number | null
    isFetching: boolean
    progress: boolean
}

type ActionType = FollowType | UnfollowType | SetUsersType | SetCurrentPageType |
                    SetTotalCountType | SetFetchingType | InProgressType

let initialState = {
    users: [] as Array<GetedUserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 2,
    isFetching: true,
    progress: false
}

// type InitialState = typeof initialState

let usersPageReducer = (state: InitialState = initialState, action: ActionType): InitialState => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.usersID, "id", {followed: true})
            }

        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.usersID, "id", {followed: false})
            }

        case SET_USERS:
            return { ...state, users: action.users }

        case SET_CURRENT_PAGE:
            return { ...state, currentPage: action.currentPage }

        case SET_TOTAL_COUNT:
            return { ...state, totalUsersCount: action.totalCount }

        case SET_LOADER:
            return { ...state, isFetching: action.isFetching }

        case FOLLOWING_IN_PROGRESS:
            return { ...state, progress: action.isFetching }

        default:
            return state
    }
}

type FollowType = {
    type: typeof FOLLOW
    usersID: number
}
export const follow = (usersID: number): FollowType => ({
    type: FOLLOW, usersID
})
type UnfollowType = {
    type: typeof UNFOLLOW
    usersID: number
}
export const unfollow = (usersID: number): UnfollowType => ({
    type: UNFOLLOW, usersID
})
type SetUsersType = {
    type: typeof SET_USERS
    users: Array<GetedUserType>
}
export const setUsers = (users: Array<GetedUserType>): SetUsersType => ({
    type: SET_USERS, users
})
type SetCurrentPageType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
export const setCurrentPage = (currentPage: number): SetCurrentPageType => ({
    type: SET_CURRENT_PAGE, currentPage
})
type SetTotalCountType = {
    type: typeof SET_TOTAL_COUNT
    totalCount: number
}
export const setTotalCount = (totalCount: number): SetTotalCountType => ({
    type: SET_TOTAL_COUNT, totalCount
})
type SetFetchingType = {
    type: typeof SET_LOADER
    isFetching: boolean
}
export const setFetching = (isFetching: boolean): SetFetchingType => ({
    type: SET_LOADER, isFetching
})
type InProgressType = {
    type: typeof FOLLOWING_IN_PROGRESS
    isFetching: boolean
}
export const inProgress = (isFetching: boolean): InProgressType => ({
    type: FOLLOWING_IN_PROGRESS, isFetching
})

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionType>
type DispatchType = Dispatch<ActionType>

export const getUsers = (currentPage: number, pageSize: number): ThunkType => {
    return async (dispatch) => {
        dispatch(setFetching(true));
        let data = await usersAPI.getUsers(currentPage, pageSize)
        dispatch(setFetching(data.followed))
        dispatch(setUsers(data.items))
        dispatch(setTotalCount(data.totalCount))
    }
}
export const onPageChenger = (pageNumber: number, pageSize: number): ThunkType => {
    return async (dispatch) => {
        dispatch(setFetching(true))
        dispatch(setCurrentPage(pageNumber))
        let data = await usersAPI.getUsers(pageNumber, pageSize)
        dispatch(setFetching(false))
        dispatch(setUsers(data.items))
    }
}


const _followUnfollowFlow = async (dispatch: DispatchType, userID: number, apiMetod: any, actionCreator: (userID: number) => FollowType | UnfollowType) => {
    dispatch(inProgress(true));
        let response = await apiMetod(userID)
        if (response.data.resultCode === 0) {
            dispatch(actionCreator(userID))
        }
        dispatch(inProgress(false))
}

export const unfollowThunk = (userID: number): ThunkType => {

    return async (dispatch) => {
        _followUnfollowFlow(dispatch, userID, followAPI.unfollow.bind(followAPI), unfollow)
    }
}
export const followThunk = (userID: number): ThunkType => {

    return async (dispatch) => {
        _followUnfollowFlow(dispatch, userID, followAPI.follow.bind(followAPI), follow)
    }
}

export default usersPageReducer