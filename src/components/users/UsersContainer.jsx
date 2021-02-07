import React from 'react'
import { connect } from 'react-redux'
import { getUsers, onPageChenger, unfollowThunk, followThunk } from '../../redux/usersPageReducer'
import Users from './Users'
import Preloader from '../common/preloader/Preloader'
import { getProgress, getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getUsersSelector } from '../../redux/usersSelectors'

class UsersAPIComponent extends React.Component {
    
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChenged = (pageNumber) => {
        this.props.onPageChenger(pageNumber, this.props.pageSize);
    }

    
    render = () => {

        

        return  <>
                    { this.props.isFetching ? <Preloader /> : null}
                    <Users onPageChenged={this.onPageChenged}
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

let mapStateToProps = (state) => {
    debugger
    return {
        users: getUsersSelector(state),
        pageSize: getPageSize(state) || 1,
        totalUsersCount: getTotalUsersCount(state) || 1,
        currentPage: getCurrentPage(state) || 1,
        isFetching: getIsFetching(state),
        progress: getProgress(state)
    }
}
//TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState
export default connect
(mapStateToProps, { getUsers, onPageChenger, unfollowThunk, followThunk })(UsersAPIComponent)