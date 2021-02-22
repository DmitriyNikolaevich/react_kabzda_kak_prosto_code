import React from 'react'
import { UserType } from '../../types/type'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import s from './Profile.module.css'
import { ProfileDataReduxFormProps } from './ProfileContainer'
import ProfileInfo from './ProfileInfo/ProfileInfo'



const Profile = (props: PropsTypes) => {
    return (
        <div className={s.content}>
            <ProfileInfo 
                isOwner={props.isOwner} 
                user={props.user} 
                status={props.status} 
                updateStatus={props.updateStatus}
                savePhoto={props.savePhoto}
                saveProfileData={props.saveProfileDataThunk} 
            />
            <MyPostsContainer />
        </div>
    )
}

export default Profile


type PropsTypes = {
    isOwner: boolean
    user: UserType | null
    status: string
    updateStatus: (userStatus: string) => void
    savePhoto: (file: File) => void
    saveProfileDataThunk: (profileData: ProfileDataReduxFormProps) => Promise<{}>
}