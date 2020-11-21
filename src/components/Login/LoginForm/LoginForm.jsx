import React from 'react';
import { reduxForm } from 'redux-form';
import { maxLenghtCreator, requiredFild } from '../../../utils/validators/validators';
import Captcha from '../../common/Captcha/Captcha';
import { createField, Input } from '../../common/FormControls/FormControls';

let maxLenght = maxLenghtCreator(30);

const LoginForm = ({captchaURL, handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                {createField("Login", "email", [ requiredFild, maxLenght ], Input)}
            </div>
            <div>
                {createField("Password", "password", [ requiredFild, maxLenght ], Input, {type: "password"})}
            </div>
            <div>
                {createField("", "rememberMe", [], Input, {type: "checkbox"})} Remember me
            </div>
            {captchaURL && <Captcha captchaURL={captchaURL} />}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm)

export default LoginReduxForm;