import React from 'react'
import { useSelector } from 'react-redux'
import {Users} from './Users'
import Preloader from '../common/preloader/Preloader'
import { getIsFetching } from '../../redux/usersSelectors'


const UsersAPIComponent: React.FC<UserPagePropsTypes> = (props) => {

    const isFetching = useSelector(getIsFetching)

    return  <>
                { isFetching ? <Preloader /> : null}
                <Users />
            </>
}

export default UsersAPIComponent

type UserPagePropsTypes = {}