// import { PhotosType } from './../types/type';
// import { PhotosExportType } from './../types/type';
import { instance } from "../API"
import { ProfileType, ResponseType, UserType } from "../types/type"

// type PhotosExportType = {
//     photos: PhotosType
// }


export const profileAPI = {
    getUser(userId: number | null) {
        return instance.get<UserType>( `profile/${userId}` ).then(res => res.data)
    },
    getStatus(userId: number) {
        return instance.get<string>( `profile/status/${userId}` ).then(res => res.data)
    },
    updateStatus(status: string) {
        return instance.put<ResponseType>(`profile/status`, { 'status': status } ).then(res => res.data)
    },
    savePhoto(file: any) {
        const formData = new FormData()
        formData.append('image', file)
        return instance.put(`profile/photo`, formData, {                                                  //<ResponseType<PhotosExportType>>
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfileData(profileData: ProfileType) {
        return instance.put<ResponseType>('profile', profileData).then(res => res.data)
    }
}