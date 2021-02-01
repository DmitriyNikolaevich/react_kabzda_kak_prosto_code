import React, { FC } from 'react';
import { UserType } from '../../types/type';
import Paginator from '../common/Paginator/Paginator';
import User from './User';

type PropsType = {
    followThunk: (id: number) => void
    unfollowThunk: (id: number) => void
    progress: boolean
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number | null
    onPageChenged: (pageNumber: number) => void
}

let Users: FC<PropsType> = ({followThunk, unfollowThunk, progress, users, pageSize, totalUsersCount, currentPage, onPageChenged}) => {
    return <div>
        <Paginator onPageChenged={onPageChenged} currentPage={currentPage} totalItemsCount={totalUsersCount} pageSize={pageSize} />
        {users.map(u => 
                <User followThunk={followThunk} 
                      unfollowThunk={unfollowThunk} 
                      progress={progress} 
                      u={u} 
                      key={u.id} 
                />)
        }
    </div>
}

export default Users;
