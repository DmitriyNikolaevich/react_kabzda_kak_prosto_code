import { createSelector } from "reselect"
import { AppStateType } from "./reduxStore"

export const getUserSelector = (state: AppStateType) => {
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
export const getInitializedApp = (state: AppStateType) => {
    return state.app.initialized
}
export const getUserFilter = (state: AppStateType) => {
    return state.usersPage.filter
}



export const getUsersSelector = createSelector(getUserSelector, (users) => {
    return users.filter(u => true)
})