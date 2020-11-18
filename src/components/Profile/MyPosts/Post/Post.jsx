import React from 'react';
import s from './Post.module.css';

const Post = (props) => {
    return (
            <div className={s.item}>
                <div>
                    <img src={props.src} alt="Alt text" />
                </div>
                {props.text}
                <div>
                    Likes: {props.likes}
                </div>
            </div>
    )
}

export default Post;