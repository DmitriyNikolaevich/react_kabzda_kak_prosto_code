import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { maxLenghtCreator, requiredFild } from '../../../utils/validators/validators';
import { Textarea } from '../../common/FormControls/FormControls';


let maxLenght30 = maxLenghtCreator(30);

const MessageForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit} >
            <div>
                <Field component={Textarea}
                        validate={[
                            requiredFild,
                            maxLenght30
                        ]}
                        placeholder={"Message"}
                        name={"message"}
                        value={props.value} />
            </div>
            <div>
                <button onClick={props.addMessage}>Add Post</button>
            </div>
        </form>
    )
}

const MessageReduxForm = reduxForm({
    form: "message"
})(MessageForm)

export default MessageReduxForm;