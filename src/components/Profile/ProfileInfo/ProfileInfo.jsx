import React from 'react';
import Preloader from '../../common/preloader/Preloader';
import s from './ProfileInfo.module.css';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userPhoto from '../../../assets/images/userPhoto.jpg';
import ProfileData from './ProfileData';
import ProfileDataForm from './ProfileDataForm';
import { useState } from 'react';
import EditModeButton from './EditModeButton';




const ProfileInfo = ({isOwner, user, status, updateStatus, savePhoto, saveProfileData}) => {

    const [editMode, editModeEditor] = useState(false);

    const activateEditMode = () => {
        editModeEditor(true);
    }

    const deactivateEditMode = () => {
        editModeEditor(false);
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files) {
            savePhoto(e.target.files[0]);
        }
    }

    const onSubmit = (formData) => {
        saveProfileData(formData).then(
            () => {
                deactivateEditMode();
            }
        );
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
                            fullName={user.fullName} 
                            lookingForAJob={user.lookingForAJob} 
                            lookingForAJobDescription={user.lookingForAJobDescription} 
                            aboutMe={user.aboutMe}
                            contacts={user.contacts}
                            onSubmit={onSubmit}
                            deactivateEditMode={deactivateEditMode}
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

export default ProfileInfo;