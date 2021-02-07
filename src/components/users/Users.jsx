import React from 'react'
import Paginator from '../common/Paginator/Paginator'
import User from './User'

let Users = ({ followThunk, unfollowThunk, progress, users, pageSize, totalUsersCount, currentPage, onPageChenged }) => {
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
