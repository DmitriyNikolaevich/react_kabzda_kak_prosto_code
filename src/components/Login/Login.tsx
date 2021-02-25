import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LoginReduxForm from './LoginForm/LoginForm'
import { login } from '../../redux/authReducer'
import { Redirect } from 'react-router-dom'
import { AppStateType } from '../../redux/reduxStore'


export const Login: FC = (props) => {

    const captchaURL = useSelector((state: AppStateType) => state.auth.captchaURL)
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)

    const dispatch = useDispatch()

    const onSubmit = (formData: LoginReduxFormType) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
    }
    if (isAuth) {
        return <Redirect to={"/profile"} />
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaURL={captchaURL} />
        </div>
    )
}


export type LoginReduxFormType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

export type CreateFieldNamePropertiesType = Extract<keyof LoginReduxFormType, string>