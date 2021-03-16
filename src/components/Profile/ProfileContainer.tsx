import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import s from './Profile.module.css'
import {Profile} from './Profile'
import { useParams, withRouter } from 'react-router-dom'
import withAuthRedirect from '../../hoc/withAuthRedirect'
import { compose } from 'redux'
import { getAuthID } from '../../redux/usersSelectors'
import { getUserStatusThunk, getUserThunk } from '../../redux/profilePageReducer'


export const ProfileContainer: React.FC = (props) => {

    const auth = useSelector(getAuthID)

    const dispatch = useDispatch()
    const { userID } = useParams<ParamType>()

    const getUser = useCallback((user: number) => {
        dispatch(getUserThunk(user))
    }, [dispatch])

    const getUserStatus = useCallback((user: number) => {
        dispatch(getUserStatusThunk(user))
    }, [dispatch])

    

    useEffect(() => {
        let user: number | null = Number(userID ? userID : auth)
        getUser(user)
        getUserStatus(user)
    }, [auth, userID, getUser, getUserStatus])

    return (
        <div className={s.content}>
            <Profile {...props} 
                isOwner={!userID}
            />
        </div>
    )
}

export default compose<React.ComponentType>( withRouter, withAuthRedirect )(ProfileContainer)

interface ParamType {
    userID: string | undefined
}