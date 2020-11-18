import React, { PureComponent } from 'react';
import s from './MyPosts.module.css';
import PostReduxForm from './PostForm/PostForm';


class MyPosts extends PureComponent {

    // shouldComponentUpdate(nextProps, nextState) {
    //     return nextProps !== this.props || nextState !== this.state;
    // };

    onSubmit = (postData) => {
        console.log(postData.post);
        this.props.addPostActionCreator(postData.post);
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

export default MyPosts;