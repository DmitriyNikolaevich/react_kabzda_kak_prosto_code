import React from 'react';
import { connect } from 'react-redux';
import s from './Profile.module.css';
import Profile from './Profile';
import { setUserProfile, getUserThunk, getUserStatusThunk, updateUserStatusThunk, savePhotoThunk } from '../../redux/profilePageReducer';
import { withRouter } from 'react-router-dom';
import withAuthRedirect from '../../hoc/withAuthRedirect';
import { compose } from 'redux';



class ProfileContainer extends React.Component {

    profileRefresher() {
        let user = this.props.match.params.userID ? this.props.match.params.userID : this.props.auth;
        this.props.getUserThunk(user);
        this.props.getUserStatusThunk(user);
    }

    componentDidMount() {
        this.profileRefresher();
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.userID !== prevProps.match.params.userID) {
            this.profileRefresher();
        }
    }

    render() {
    return (
        <div className={s.content}>
            <Profile {...this.props} 
                isOwner={!this.props.match.params.userID} 
                user={this.props.user} 
                status={this.props.status} 
                updateStatus={this.props.updateUserStatusThunk} 
                savePhoto={this.props.savePhotoThunk}
            />
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

export default compose( connect(mapStateToProps, {setUserProfile, getUserThunk, getUserStatusThunk, updateUserStatusThunk, savePhotoThunk}), withRouter, withAuthRedirect )(ProfileContainer); 