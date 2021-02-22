import React from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../redux/profilePageReducer'
import { AppStateType } from '../../../redux/reduxStore'
import MyPosts from './MyPosts'
import Post from './Post/Post'



let mapStateToProps = (state: AppStateType) => {
    return {
        postsItems: state.profilePage.posts.map( el => <Post src={el.src} text={el.text} key={el.id} likes={el.likes} />)
    }
}

const MyPostsContainer = connect(mapStateToProps, {
    addPostActionCreator: actions.addPostActionCreator
})(MyPosts)

export default MyPostsContainer


export type PostMessageReduxFormType = {
    post: string
}
export type CreateFieldNamePropertiesType = Extract<keyof PostMessageReduxFormType, string>