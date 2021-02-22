import { PureComponent } from 'react'
import s from './MyPosts.module.css'
import { PostMessageReduxFormType } from './MyPostsContainer'
import PostReduxForm from './PostForm/PostForm'


class MyPosts extends PureComponent<PropsTypes> {


    onSubmit = (postData: PostMessageReduxFormType) => {
        this.props.addPostActionCreator(postData.post)
    }

    render() {
        return (
            <div>
                <div>
                    <h3>My Posts</h3>
                </div>
                <PostReduxForm onSubmit={this.onSubmit} />
                <div className={s.posts}>
                    {this.props.postsItems}
                </div>
            </div>
        )
    }
}

export default MyPosts


type PropsTypes = {
    addPostActionCreator: (post: string) => void
    postsItems: any
}