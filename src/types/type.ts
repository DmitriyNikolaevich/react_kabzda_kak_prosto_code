type PostType = {
    id: number
    src: string | null
    text: string | null
    likes: number | null
}

export type InitialState = {
    newPostText: string | null
    profile: any
    status: string | null
    user: number | null
    posts: Array<PostType>
}

type PhotosType = {
    small: string
    large: string
}

export type UserType = {
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