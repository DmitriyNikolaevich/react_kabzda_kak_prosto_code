import React, { FC } from 'react'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { maxLenghtCreator, requiredFild } from '../../../utils/validators/validators'
import Captcha from '../../common/Captcha/Captcha'
import { createField, Input } from '../../common/FormControls/FormControls'
import { CreateFieldNamePropertiesType, LoginReduxFormType } from '../Login'

let maxLenght = maxLenghtCreator(30);

export type LoginFormOwnProps = {
    captchaURL: string | null
}

const LoginForm: FC<InjectedFormProps<LoginReduxFormType, LoginFormOwnProps> & LoginFormOwnProps> = ({ handleSubmit, error, captchaURL }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                {createField<CreateFieldNamePropertiesType>("Login", "email", [ requiredFild, maxLenght ], Input)}
            </div>
            <div>
                {createField<CreateFieldNamePropertiesType>("Password", "password", [ requiredFild, maxLenght ], Input, {type: "password"})}
            </div>
            <div>
                {createField<CreateFieldNamePropertiesType>("", "rememberMe", [], Input, {type: "checkbox"})} Remember me
            </div>
            {captchaURL && <Captcha captchaURL={captchaURL} />}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<LoginReduxFormType, LoginFormOwnProps>({
    form: 'login'
})(LoginForm)

export default LoginReduxForm