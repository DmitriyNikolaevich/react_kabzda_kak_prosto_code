import Axios from "axios";


export const instance = Axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "f747db5e-dcb5-4b79-a43c-812e564ac23b"
    }
});
export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            })
    }
}

export const followAPI = {
    follow(userID) {
        return instance.post(`follow/${userID}`);
    },
    unfollow(userID) {
        return instance.delete(`follow/${userID}`);
    }
}

export const authAPI = {
    getAuth() {
        return instance.get(`auth/me`);
    },
    login(email, password, rememberMe = false) {
        return instance.post(`auth/login`, {email, password, rememberMe})
    },
    logout() {
        return instance.delete(`auth/login`);
    }
}

export const profileAPI = {
    getUser(userId) {
        return instance.get( `profile/${userId}` );
    },
    getStatus(userId) {
        return instance.get( `profile/status/${userId}` )
    },
    updateStatus(status) {
        return instance.put(`profile/status`, { 'status': status } )
    },
    savePhoto(file) {
        const formData = new FormData();
        formData.append('image', file);
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}