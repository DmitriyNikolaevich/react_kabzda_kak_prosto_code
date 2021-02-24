import React from 'react'
import { connect } from 'react-redux'
import { getUsers, unfollowThunk, followThunk, FilterType } from '../../redux/usersPageReducer'
import Users from './Users'
import Preloader from '../common/preloader/Preloader'
import { getProgress, getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getUsersSelector, getUserFilter } from '../../redux/usersSelectors'
import { AppStateType } from '../../redux/reduxStore'
import { GetedUserType } from '../../types/type'

class UsersAPIComponent extends React.Component<PropsTypes> {
    
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize, "")
    }

    onPageChenged = (pageNumber: number) => {
        const { pageSize, filter } = this.props
        this.props.getUsers(pageNumber, pageSize, filter.term);
    }

    onFilterChange = (filter: FilterType) => {
        const { pageSize } = this.props
        this.props.getUsers(1, pageSize, filter.term)
    }

    
    render = () => {

        

        return  <>
                    { this.props.isFetching ? <Preloader /> : null}
                    <Users onPageChenged={this.onPageChenged}
                         onFilterChange={this.onFilterChange}
                         currentPage={this.props.currentPage}
                         totalUsersCount={this.props.totalUsersCount}
                         pageSize={this.props.pageSize}
                         users={this.props.users}
                         progress={this.props.progress}
                         unfollowThunk={this.props.unfollowThunk}
                         followThunk={this.props.followThunk}
                    />
                </>
    }
}

let mapStateToProps = (state: AppStateType) => {
    return {
        users: getUsersSelector(state),
        pageSize: getPageSize(state) || 1,
        totalUsersCount: getTotalUsersCount(state) || 1,
        currentPage: getCurrentPage(state) || 1,
        isFetching: getIsFetching(state),
        progress: getProgress(state),
        filter: getUserFilter(state)
    }
}

export default connect(mapStateToProps, { getUsers, unfollowThunk, followThunk })(UsersAPIComponent)


type PropsTypes = {
    currentPage: number
    totalUsersCount: number
    pageSize: number
    isFetching: boolean
    users: GetedUserType[]
    progress: boolean
    filter: FilterType
    unfollowThunk: (usersID: number) => void
    followThunk: (usersID: number) => void
    getUsers: (currentPage: number, pageSize: number, term: string) => void
}