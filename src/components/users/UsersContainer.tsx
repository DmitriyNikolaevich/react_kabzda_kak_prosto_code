import React from 'react'
import { connect } from 'react-redux'
import { getUsers, onPageChenger, unfollowThunk, followThunk } from '../../redux/usersPageReducer'
import Users from './Users'
import Preloader from '../common/preloader/Preloader'
import { getProgress, getUsersSelector, getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching } from '../../redux/usersSelectors'
import { UserType } from '../../types/type'
import { AppStateType } from '../../redux/reduxStore'

type MapStatePropsType = {
    currentPage: number
    pageSize: number
    isFetching: boolean | undefined
    totalUsersCount: number
    users: Array<UserType>
    progress: boolean
}

type MapDispatchPropsType = {
    getUsers: (currentPage: number, pageSize: number) => void
    onPageChenger: (pageNumber: number, pageSize: number) => void
    unfollowThunk: (id: number) => void
    followThunk: (id: number) => void
}

type OwnPropsType = {
    pageTitle: string
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class UsersAPIComponent extends React.Component<PropsType> {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChenged = (pageNumber: number) => {
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

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
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
export default connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>
(mapStateToProps, { getUsers, onPageChenger, unfollowThunk, followThunk })(UsersAPIComponent)