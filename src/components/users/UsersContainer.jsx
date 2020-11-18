import React from 'react';
import { connect } from 'react-redux';
import { setCurrentPage, inProgress, getUsers, onPageChenger, unfollowThunk, followThunk } from '../../redux/usersPageReducer';
import Users from './Users';
import Preloader from '../common/preloader/Preloader';
import { getProgress, getUsersSelector, getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching } from '../../redux/usersSelectors';



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
                         isFetching={this.props.isFetching}
                         progress={this.props.progress}
                         inProgress={this.props.inProgress}
                         unfollowThunk={this.props.unfollowThunk}
                         followThunk={this.props.followThunk}
                    />
                </>
    }
}

let mapStateToProps = (state) => {
    return {
        users: getUsersSelector(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        progress: getProgress(state)
    }
};

export default connect(mapStateToProps, { setCurrentPage, inProgress, getUsers, onPageChenger, unfollowThunk, followThunk })(UsersAPIComponent);