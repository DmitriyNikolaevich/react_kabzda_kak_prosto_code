import { FC } from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form'
import { maxLenghtCreator, requiredFild } from '../../../utils/validators/validators'
import { createField, Textarea } from '../../common/FormControls/FormControls'


let maxLenght30 = maxLenghtCreator(30);

const MessageForm: FC<InjectedFormProps<MessagesReduxFormType, PropsType> & PropsType> = (props) => {

    return (
        <form onSubmit={props.handleSubmit} >
            <div>
                {createField<CreateFieldNamePropertiesType>("Message", "message", [ requiredFild, maxLenght30 ], Textarea)}
            </div>
            <div>
                <button>Add Post</button>
            </div>
        </form>
    )
}

const MessageReduxForm = reduxForm<MessagesReduxFormType>({
    form: "message"
})(MessageForm)

export default MessageReduxForm


type PropsType = {}
type MessagesReduxFormType = {
    message: string
}
type CreateFieldNamePropertiesType = Extract<keyof MessagesReduxFormType, string>