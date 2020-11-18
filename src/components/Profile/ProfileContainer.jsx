import React from 'react';
import { connect } from 'react-redux';
import s from './Profile.module.css';
import Profile from './Profile';
import { setUserProfile, getUserThunk, getUserStatusThunk, updateUserStatusThunk } from '../../redux/profilePageReducer';
import { withRouter } from 'react-router-dom';
import withAuthRedirect from '../../hoc/withAuthRedirect';
import { compose } from 'redux';



class ProfileContainer extends React.Component {

    componentDidMount() {
        let user = this.props.match.params.userID ? this.props.match.params.userID : this.props.auth;
        this.props.getUserThunk(user);
        this.props.getUserStatusThunk(user);
    }

    render() {
    return (
        <div className={s.content}>
            <Profile {...this.props} user={this.props.user} status={this.props.status} updateStatus={this.props.updateUserStatusThunk} />
        </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        user: state.profilePage.user,
        auth: state.auth.userId,
        isAuth: state.auth.isAuth,
        status: state.profilePage.status
    }
};

export default compose( connect(mapStateToProps, {setUserProfile, getUserThunk, getUserStatusThunk, updateUserStatusThunk}), withRouter, withAuthRedirect )(ProfileContainer); 