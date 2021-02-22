import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { AppStateType } from '../redux/reduxStore'

let mapStateToPropsForRedirect = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
} as const)

export function withAuthRedirect<WCP>(Component: React.ComponentType<WCP>) {

    const RedirectComponent: React.FC<MapPropsType & DispatchType> = (props) => {

            let { isAuth, ...restProps } = props

            if (!isAuth) return <Redirect to={'/login'} />;
            return <Component {...restProps as WCP} />
    }
    
    let ConnectedAuthRedirectComponent = connect<MapPropsType, {}, WCP, AppStateType>(mapStateToPropsForRedirect, {})(RedirectComponent)

    return ConnectedAuthRedirectComponent
}

export default withAuthRedirect

type MapPropsType = {
    isAuth: boolean
}

type DispatchType = {

}