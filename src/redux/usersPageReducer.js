import { followAPI, usersAPI } from "../API";
//import { updateObjectInArray } from "../utils/objectHelper";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT';
const SET_LOADER = 'SET_LOADER';
const FOLLOWING_IN_PROGRESS = 'FOLLOWING_IN_PROGRESS';

let initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 2,
    isFetching: true,
    progress: null
};

let usersPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                //users: updateObjectInArray(state.users, action.usersID, "id", {followed: true})
                users: state.users.map(u => {
                    if (u.id === action.usersID) {
                        return { ...u, followed: true }
                    }
                    return u;
                })
            }

        case UNFOLLOW:
            return {
                ...state,
                //users: updateObjectInArray(state.users, action.usersID, "id", {followed: false})
                users: state.users.map(u => {
                    if (u.id === action.usersID) {
                        return { ...u, followed: false }
                    }
                    return u;
                })
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

export const follow = (usersID) => ({
    type: FOLLOW, usersID
});
export const unfollow = (usersID) => ({
    type: UNFOLLOW, usersID
});
export const setUsers = (users) => ({
    type: SET_USERS, users
});
export const setCurrentPage = (currentPage) => ({
    type: SET_CURRENT_PAGE, currentPage
});
export const setTotalCount = (totalCount) => ({
    type: SET_TOTAL_COUNT, totalCount
});
export const setFetching = (isFetching) => ({
    type: SET_LOADER, isFetching
});
export const inProgress = (isFetching) => ({
    type: FOLLOWING_IN_PROGRESS, isFetching
});


export const getUsers = (currentPage, pageSize) => {
    return async (dispatch) => {
        dispatch(setFetching(true));
        let data = await usersAPI.getUsers(currentPage, pageSize);
        dispatch(setFetching(data.followed));
        dispatch(setUsers(data.items));
        dispatch(setTotalCount(data.totalCount));
    };
};
export const onPageChenger = (pageNumber, pageSize) => {
    return async (dispatch) => {
        dispatch(setFetching(true));
        dispatch(setCurrentPage(pageNumber));
        let data = await usersAPI.getUsers(pageNumber, pageSize);
        dispatch(setFetching(false));
        dispatch(setUsers(data.items));
    }
};


const followUnfollowFlow = async (dispatch, userID, apiMetod, actionCreator) => {
    dispatch(inProgress(true));
        let response = await apiMetod(userID);
        if (response.data.resultCode === 0) {
            dispatch(actionCreator(userID));
        }
        dispatch(inProgress(false));
}

export const unfollowThunk = (userID) => {

    return async (dispatch) => {
        followUnfollowFlow(dispatch, userID, followAPI.unfollow.bind(followAPI), unfollow);
    }
};
export const followThunk = (userID) => {

    return async (dispatch) => {
        followUnfollowFlow(dispatch, userID, followAPI.follow.bind(followAPI), follow);
    }
}

export default usersPageReducer;