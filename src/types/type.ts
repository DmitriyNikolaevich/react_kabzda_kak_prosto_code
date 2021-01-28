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