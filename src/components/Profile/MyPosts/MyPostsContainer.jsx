import React from 'react';
import { connect } from 'react-redux';
import { actions } from '../../../redux/profilePageReducer';
import MyPosts from './MyPosts';
import Post from './Post/Post';



let mapStateToProps = (state) => {
    return {
        postsItems: state.profilePage.posts.map( el => <Post src={el.src} text={el.text} key={el.id} likes={el.likes} />),
        value: state.profilePage.newPostText
    }
};

const MyPostsContainer = connect(mapStateToProps, {actions})(MyPosts);

export default MyPostsContainer;