import React, { ChangeEvent } from 'react'
import Preloader from '../../common/preloader/Preloader'
import s from './ProfileInfo.module.css'
import ProfileStatusWithHooks from './ProfileStatusWithHooks'
import userPhoto from '../../../assets/images/userPhoto.jpg'
import ProfileData from './ProfileData'
import ProfileDataForm from './ProfileDataForm'
import { useState } from 'react'
import EditModeButton from './EditModeButton'
import { UserType } from '../../../types/type'
import { ProfileDataReduxFormProps } from '../ProfileContainer'




const ProfileInfo: React.FC<PropsTypes> = ({isOwner, user, status, updateStatus, savePhoto, saveProfileData}) => {

    const [editMode, editModeEditor] = useState(false)

    const activateEditMode = () => {
        editModeEditor(true)
    }

    const deactivateEditMode = () => {
        editModeEditor(false)
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData: ProfileDataReduxFormProps) => {
        saveProfileData(formData).then(
            () => {
                deactivateEditMode()
            }
        )
    }
    

    if (!user) {
        return <Preloader />
    }
    
    return (
        <div>
            <div>
                <img src='https://img.fonwall.ru/o/1c/kosmos-planety-vselennaya-360z.jpg' alt="Alt text" />
            </div>
            <div className={s.ava}>
                <img src={user.photos.large || userPhoto} alt="Alt text" /> + discription
                {isOwner && <input type={"file"} onChange={onMainPhotoSelected} />}
                {editMode 
                ?   <ProfileDataForm 
                            lookingForAJob={user.lookingForAJob}
                            contacts={user.contacts}
                            onSubmit={onSubmit}
                            initialValues={user}
                    />
                :   <ProfileData 
                            fullName={user.fullName} 
                            lookingForAJob={user.lookingForAJob} 
                            lookingForAJobDescription={user.lookingForAJobDescription} 
                            aboutMe={user.aboutMe}
                            contacts={user.contacts}
                />
                }
                {isOwner && !editMode &&
                    <EditModeButton 
                            editMode={editMode}
                            deactivateEditMode={deactivateEditMode}
                            activateEditMode={activateEditMode}
                    />
                }
                <ProfileStatusWithHooks 
                        status={status} 
                        updateStatus={updateStatus} 
                />
            </div>
        </div>
    )
}

export default ProfileInfo


type PropsTypes = {
    isOwner: boolean
    user: UserType | null
    status: string
    updateStatus: (userStatus: string) => void
    savePhoto: (file: File) => void
    saveProfileData: (profileData: ProfileDataReduxFormProps) => Promise<any>
}