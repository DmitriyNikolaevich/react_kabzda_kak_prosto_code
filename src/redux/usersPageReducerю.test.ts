// let user = require("./usersPageReducer")

import usersPageReducer, { actions } from "./usersPageReducer"

let state = {
    users: [
        {id: 0, name: "Dima 1", photos: { small: "", large: ""}, followed: false, status: "0"},
        {id: 1, name: "Dima 2", photos: { small: "", large: ""}, followed: false, status: "1"},
        {id: 2, name: "Dima 3", photos: { small: "", large: ""}, followed: true, status: "2"},
        {id: 3, name: "Dima 4", photos: { small: "", large: ""}, followed: true, status: "3"}
    ],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 2,
    isFetching: true,
    progress: false
}

beforeEach(() => {
    state = {
        users: [
            {id: 0, name: "Dima 1", photos: { small: "", large: ""}, followed: false, status: "0"},
            {id: 1, name: "Dima 2", photos: { small: "", large: ""}, followed: false, status: "1"},
            {id: 2, name: "Dima 3", photos: { small: "", large: ""}, followed: true, status: "2"},
            {id: 3, name: "Dima 4", photos: { small: "", large: ""}, followed: true, status: "3"}
        ],
        pageSize: 10,
        totalUsersCount: 0,
        currentPage: 2,
        isFetching: true,
        progress: false
    }
})



test("follow",() => {
    const newState = usersPageReducer(state, actions.follow(0))
    expect(newState.users[0].followed).toBeTruthy()
})