import React from 'react'
import { connect } from 'react-redux'
import s from './Profile.module.css'
import Profile from './Profile'
import { getUserStatusThunk, getUserThunk, savePhotoThunk, saveProfileDataThunk, updateUserStatusThunk } from '../../redux/profilePageReducer'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import withAuthRedirect from '../../hoc/withAuthRedirect'
import { compose } from 'redux'
import { AppStateType } from '../../redux/reduxStore'



class ProfileContainer extends React.Component<PropsTypes & DispatchTypes & RouteComponentProps<PathParamsTypes>> {


    profileRefresher() {
        let user: number | null = this.props.match.params.userID ? +this.props.match.params.userID : this.props.auth;
        this.props.getUserThunk(user)
        this.props.getUserStatusThunk(user)
    }

    componentDidMount() {
        this.profileRefresher();
    }

    componentDidUpdate(prevProps: PropsTypes & RouteComponentProps<PathParamsTypes>) {
        if (this.props.match.params.userID !== prevProps.match.params.userID) {
            this.profileRefresher()
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
                saveProfileDataThunk={this.props.saveProfileDataThunk}
            />
        </div>
        )
    }
}

let mapStateToProps = (state: AppStateType) => {
    return {
        user: state.profilePage.user,
        auth: state.auth.userId,
        status: state.profilePage.status
    }
}

export default compose<React.ComponentType>(connect(mapStateToProps, { getUserThunk, getUserStatusThunk, updateUserStatusThunk, savePhotoThunk, saveProfileDataThunk }), withRouter, withAuthRedirect )(ProfileContainer)


export type ProfileDataReduxFormProps = {
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    aboutMe: string
}

export type CreateFieldNamePropertiesType = Extract<keyof ProfileDataReduxFormProps, string>

type PropsTypes = ReturnType<typeof mapStateToProps>

type DispatchTypes = {
    updateUserStatusThunk: (userStatus: string) => void
    savePhotoThunk: (file: File) => void
    saveProfileDataThunk: (profileData: ProfileDataReduxFormProps) => Promise<any>
    getUserThunk: (user: number | null) => void
    getUserStatusThunk: (user: number | null) => void
}

type PathParamsTypes = {
    userID: string | undefined
}