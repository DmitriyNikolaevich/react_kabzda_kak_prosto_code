import React from 'react';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import s from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';



const Profile = (props) => {
    return (
        <div className={s.content}>
            <ProfileInfo 
                isOwner={props.isOwner} 
                user={props.user} 
                status={props.status} 
                updateStatus={props.updateStatus}
                savePhoto={props.savePhoto} 
            />
            <MyPostsContainer store={props.store} />
        </div>
    )
}

export default Profile;