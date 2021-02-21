import { ResultCodesEnum } from "../API"

type PostType = {
    id: number
    src: string | null
    text: string | null
    likes: number | null
}

export type ProfileType = {
    userID: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: any
    photos: PhotosType
}

export type InitialState = {
    newPostText: string | null
    profile: any
    status: string | null
    user: UserType | null
    posts: Array<PostType>
}

export type PhotosType = {
    small: string
    large: string
}

export type PhotosExportType = {
    photos: PhotosType
}

type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

export type UserType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
    followed: boolean
    status: string
}

export type GetedUserType = {
    id: number
    name: string
    status: string
    photos: PhotosType
    followed: boolean
}

export type Message = {
    id: number
    message: string
}

export type ResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D
    messages: string
    resultCode: RC
}