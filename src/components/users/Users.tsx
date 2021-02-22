import React from 'react'
import { GetedUserType } from '../../types/type'
import Paginator from '../common/Paginator/Paginator'
import User from './User'

let Users = ({ followThunk, unfollowThunk, progress, users, pageSize, totalUsersCount, currentPage, onPageChenged }: PropsType) => {
    debugger
    return <div>
        <Paginator onPageChenged={onPageChenged} currentPage={currentPage} totalItemsCount={totalUsersCount} pageSize={pageSize} />
        {users.map(u => <User followThunk={followThunk}
            unfollowThunk={unfollowThunk}
            progress={progress}
            u={u}
            key={u.id}
        />)
        }
    </div>
}

export default Users

type PropsType = {
    followThunk: (id: number) => void
    unfollowThunk: (id: number) => void 
    progress: boolean
    users: GetedUserType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    onPageChenged: (pageNumber: number) => void
}
