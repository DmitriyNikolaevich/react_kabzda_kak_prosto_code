import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { maxLenghtCreator, requiredFild } from '../../../utils/validators/validators';
import { Input } from '../../common/FormControls/FormControls';

let maxLenght = maxLenghtCreator(30);

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={"Login"}
                        component={Input}
                        name={"email"}
                        validate={[
                            requiredFild,
                            maxLenght
                        ]}
                        />
            </div>
            <div>
                <Field placeholder={"Password"}
                        component={Input}
                        name={"password"}
                        validate={[
                            requiredFild,
                            maxLenght
                        ]}
                        type={"password"}
                         />
            </div>
            <div>
                <Field type={"checkbox"} component={Input} name={"rememberMe"} /> Remember me
            </div>
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