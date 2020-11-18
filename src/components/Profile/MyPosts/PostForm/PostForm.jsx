import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { maxLenghtCreator, requiredFild } from '../../../../utils/validators/validators';
import { Textarea } from '../../../common/FormControls/FormControls';


const maxLenght = maxLenghtCreator(10);

const PostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} name={"post"} validate={[
                    requiredFild, maxLenght
                ]} placeholder="Required fild" />
            </div>

            <div>
                <button>Add Post</button>
            </div>
        </form>
    )
}

const PostReduxForm = reduxForm({
    form: 'post'
})(PostForm)

export default PostReduxForm;