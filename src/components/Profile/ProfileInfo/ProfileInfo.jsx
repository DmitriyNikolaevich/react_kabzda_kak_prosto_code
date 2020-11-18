import React from 'react';
import Preloader from '../../common/preloader/Preloader';
import s from './ProfileInfo.module.css';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';


const ProfileInfo = (props) => {

    if (!props.user) {
        return <Preloader />
    }

    return (
        <div>
            <div>
                <img src='https://img.fonwall.ru/o/1c/kosmos-planety-vselennaya-360z.jpg' alt="Alt text" />
            </div>
            <div className={s.ava}>
                <img src={props.user.photos.small} alt="Alt text" /> + discription
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} />
            </div>
        </div>
    )
}

export default ProfileInfo;