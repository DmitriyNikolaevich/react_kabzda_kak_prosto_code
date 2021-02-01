import { createSelector } from "reselect"
import { AppStateType } from "./reduxStore"

export const getUsers = (state: AppStateType) => {
    return state.usersPage.users
}

export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize
}

export const getTotalUsersCount = (state: AppStateType) => {
    return state.usersPage.totalUsersCount
}

export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage
}

export const getIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching
}

export const getProgress = (state: AppStateType) => {
    return state.usersPage.progress
}

export const getIsAuth = (state: AppStateType) => {
    return state.auth.isAuth
}

export const getNewMessageText = (state: AppStateType) => {
    return state.dialogPage.newMessageText
}

export const getUsersSelector = createSelector(getUsers, (users) => {
    return users.filter(u => true)
})