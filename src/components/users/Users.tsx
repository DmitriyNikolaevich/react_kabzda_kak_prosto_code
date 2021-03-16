import React, { useEffect } from 'react'
import Paginator from '../common/Paginator/Paginator'
import User from './User'
import UserSearchForm from './Search/UserSearchForm'
import { FilterType, followThunk, getUsers, unfollowThunk } from '../../redux/usersPageReducer'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentPage, getPageSize, getProgress, getTotalUsersCount, getUserFilter, getUsersSelector } from '../../redux/usersSelectors'

export const Users: React.FC<PropsType> = (props) => {

    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const users = useSelector(getUsersSelector)
    const progress = useSelector(getProgress)
    const filter = useSelector(getUserFilter)


    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUsers(currentPage, pageSize, ""))
    }, [currentPage, pageSize, dispatch])


    const onPageChenged = (pageNumber: number) => {
        dispatch(getUsers(pageNumber, pageSize, filter.term))
    }

    const onFilterChange = (filter: FilterType) => {
        dispatch(getUsers(1, pageSize, filter.term))
    }

    const unfollow = (usersID: number) => {
        dispatch(unfollowThunk(usersID))
    }

    const follow = (usersID: number) => {
        dispatch(followThunk(usersID))
    }

    return <div>
        <div>
            <UserSearchForm onFilterChange={onFilterChange} />
        </div>
        <Paginator onPageChenged={onPageChenged} currentPage={currentPage} totalItemsCount={totalUsersCount} pageSize={pageSize} />
        {users.map(u => <User followThunk={follow}
            unfollowThunk={unfollow}
            progress={progress}
            u={u}
            key={u.id}
        />)
        }
    </div>
}

type PropsType = {}
