import { FC } from 'react'
import { connect } from 'react-redux'
import LoginReduxForm from './LoginForm/LoginForm'
import { login } from '../../redux/authReducer'
import { Redirect } from 'react-router-dom'
import { AppStateType } from '../../redux/reduxStore'

type MapStateToPropsType = {
    isAuth: boolean
    captchaURL: string | null
}

type MapDispatchToPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

export type LoginReduxFormType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
    captchaURL: string | null
}

export type CreateFieldNamePropertiesType = Extract<keyof LoginReduxFormType, string>

const Login: FC<MapStateToPropsType & MapDispatchToPropsType> = (props) => {

    const onSubmit = (formData: LoginReduxFormType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
    }
    if (props.isAuth) {
        return <Redirect to={"/profile"} />
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaURL={props.captchaURL} />
        </div>
    )
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    captchaURL: state.auth.captchaURL
})

export default connect(mapStateToProps, { login })(Login)