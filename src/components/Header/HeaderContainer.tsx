import React from 'react'
import { connect } from 'react-redux'
import Header from './Header'
import {logout} from '../../redux/authReducer'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import { AppStateType } from '../../redux/reduxStore'

class HeaderContainer extends React.Component<PropsTypes> {
    
    render() {
        return <Header {...this.props} /> 
    }
}

const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

export default compose<React.ComponentType>(withRouter,
    connect(mapStateToProps, { logout }))(HeaderContainer)


type PropsTypes = {
    isAuth: boolean
    login: string
    logout: () => void
}