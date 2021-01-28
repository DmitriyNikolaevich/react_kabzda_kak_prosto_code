import { followAPI, usersAPI } from "../API";
import { updateObjectInArray } from "../utils/objectHelper";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT';
const SET_LOADER = 'SET_LOADER';
const FOLLOWING_IN_PROGRESS = 'FOLLOWING_IN_PROGRESS';

type User = {

}

type InitialState = {
    users: Array<User> | null
    pageSize: number | null
    totalUsersCount: number | null
    currentPage: number | null
    isFetching: boolean
    progress: number | null
}

let initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 2,
    isFetching: true,
    progress: null
};

let usersPageReducer = (state = initialState, action: any): InitialState => {
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
            return { ...state, users: action.users };

        case SET_CURRENT_PAGE:
            return { ...state, currentPage: action.currentPage };

        case SET_TOTAL_COUNT:
            return { ...state, totalUsersCount: action.totalCount }

        case SET_LOADER:
            return { ...state, isFetching: action.isFetching }

        case FOLLOWING_IN_PROGRESS:
            return { ...state, progress: action.isFetching }

        default:
            return state;
    }
}

export const follow = (usersID: number) => ({
    type: FOLLOW, usersID
});
export const unfollow = (usersID: number) => ({
    type: UNFOLLOW, usersID
});
export const setUsers = (users: string) => ({
    type: SET_USERS, users
});
export const setCurrentPage = (currentPage: number) => ({
    type: SET_CURRENT_PAGE, currentPage
});
export const setTotalCount = (totalCount: number) => ({
    type: SET_TOTAL_COUNT, totalCount
});
export const setFetching = (isFetching: boolean) => ({
    type: SET_LOADER, isFetching
});
export const inProgress = (isFetching: boolean) => ({
    type: FOLLOWING_IN_PROGRESS, isFetching
});


export const getUsers = (currentPage: number, pageSize: number) => {
    return async (dispatch: any) => {
        dispatch(setFetching(true));
        let data = await usersAPI.getUsers(currentPage, pageSize);
        dispatch(setFetching(data.followed));
        dispatch(setUsers(data.items));
        dispatch(setTotalCount(data.totalCount));
    };
};
export const onPageChenger = (pageNumber: number, pageSize: number) => {
    return async (dispatch: any) => {
        dispatch(setFetching(true));
        dispatch(setCurrentPage(pageNumber));
        let data = await usersAPI.getUsers(pageNumber, pageSize);
        dispatch(setFetching(false));
        dispatch(setUsers(data.items));
    }
};


const followUnfollowFlow = async (dispatch: any, userID: number, apiMetod: any, actionCreator: any) => {
    dispatch(inProgress(true));
        let response = await apiMetod(userID);
        if (response.data.resultCode === 0) {
            dispatch(actionCreator(userID));
        }
        dispatch(inProgress(false));
}

export const unfollowThunk = (userID: number) => {

    return async (dispatch: any) => {
        followUnfollowFlow(dispatch, userID, followAPI.unfollow.bind(followAPI), unfollow);
    }
};
export const followThunk = (userID: number) => {

    return async (dispatch: any) => {
        followUnfollowFlow(dispatch, userID, followAPI.follow.bind(followAPI), follow);
    }
}

export default usersPageReducer;