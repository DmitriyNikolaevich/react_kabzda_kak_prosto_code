import React from 'react';
import Preloader from '../../common/preloader/Preloader';
import s from './ProfileInfo.module.css';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userPhoto from '../../../assets/images/userPhoto.jpg';




const ProfileInfo = (props) => {

    //const userPhoto = 'https://yandex.ru/images/_crpd/1k00Bv363/fda7baVuV/w67q95nBg7VBPpAu-7LnKXyrhEj4EylW7BSmIu6MjelT1Pr9XqSMTOqjaYLH84YDuoIjoVFsofB6WMkxAkA30M_j4v_w6Y_4CAvUfqKTgnBtg_EpjUp0V8Q58zrurNGcewQiQeZsTNRuKsFmQ9vTD46iX6RcdQxYO0W0hF8R23UXPvNexNWXWWlaOPbi1v-tKQ-ogGjbpWdIDBYz1oixAHv0tn0-YJi0Pur5WicbYxtKaiokDDnkPbM5eLiPwaPV1wZ79njJo91Vykh2plY3pZXPwCxM2wUz3Oz2T37cPeBr1Aqh_lCgzAKqHX5Pqx-DtgaGdESxwAWP_fwQz5VT8YvCs9YYQVehpUZM-moOW70BIzAASLPp55A00veOCM0s70DuwdqobCyGNhHSM5szv9JyBgTYJZAZL6HUpF8901H7-rfajBUrPWnS_P5ehpu1ZQfY0ARr3Xe0aK4r1ti1iL-cDqXOQBDcomrRYp_bh39GcnZQQGm0wRsNfGyXNZsFq14jerTpDwVdPsiuahb3BVkH6KQgG5GrPGg-4-IwiRjf1Arl3sAcUH4Gvd6r7xsfVqIerHzJuDkDSUQA7yVHDTemb1rwrRPxTeaMOhpa5x0Rh6jQGE-5e9CAAq-60AUsTziOJdKEnDjiZgmCn-9bJz4O7pR84awpm93MvJPhL3Ur3ouuNBmf4Wm6KDZ-kg-pIbeIlJTnhasAxGbXZhhVtKfQQg3GDIyw5mbpVrvjR7s6coKwpG2YNZN1xCh7OUvN92brAmSVZ-FN8sx6Kk5b6VnfZCQcR7XvjDACb_LMwXij7A7R8rhscPLeiQ4np4OfGr7eFAzhLLn7PdSUd41TacNGa6I0lat1waqwynYmhxX5BzgQWLtdD0BMVpuW3AWoS-gW0Qb8YIAW2tX6v7dLkxYWjiTAtcC597nc3FOp66U3pmu2-MmjUcH2AEJmSvf9ia9Y2PwzDXPAJOp7dvAI';

    const onMainPhotoSelected = (e) => {
        if (e.target.files) {
            props.savePhoto(e.target.files[0]);
        }
    }
    

    if (!props.user) {
        return <Preloader />
    }

    return (
        <div>
            <div>
                <img src='https://img.fonwall.ru/o/1c/kosmos-planety-vselennaya-360z.jpg' alt="Alt text" />
            </div>
            <div className={s.ava}>
                <img src={props.user.photos.large || userPhoto} alt="Alt text" /> + discription
                {props.isOwner && <input type={"file"} onChange={onMainPhotoSelected} />}
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} />
            </div>
        </div>
    )
}

export default ProfileInfo;