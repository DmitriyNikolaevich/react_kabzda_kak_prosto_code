import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { savePhotoThunk, updateUserStatusThunk } from '../../redux/profilePageReducer'
import { getStatus, getUserProfile } from '../../redux/usersSelectors'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import s from './Profile.module.css'
import ProfileInfo from './ProfileInfo/ProfileInfo'




export const Profile: React.FC<PropsTypes> = (props) => {

    const user = useSelector(getUserProfile)
    const status = useSelector(getStatus)

    const dispatch = useDispatch()

    const savePhoto = (file: File) => {
        dispatch(savePhotoThunk(file))
    }
    // const saveProfileData = (profileData: ProfileDataReduxFormProps) => {
    //     dispatch(saveProfileDataThunk(profileData))
    // }
    const updateStatus = (userStatus: string) => {
        dispatch(updateUserStatusThunk(userStatus))
    }

    return (
        <div className={s.content}>
            <ProfileInfo 
                isOwner={props.isOwner} 
                user={user} 
                status={status} 
                updateStatus={updateStatus}
                savePhoto={savePhoto}
                //saveProfileData={saveProfileData} 
            />
            <MyPostsContainer />
        </div>
    )
}


type PropsTypes = {
    isOwner: boolean
}

export type ProfileDataReduxFormProps = {
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    aboutMe: string
}

export type CreateFieldNamePropertiesType = Extract<keyof ProfileDataReduxFormProps, string>