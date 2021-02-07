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

type PhotosType = {
    small: string
    large: string
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