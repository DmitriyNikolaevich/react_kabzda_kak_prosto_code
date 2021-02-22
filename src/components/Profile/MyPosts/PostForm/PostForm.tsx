import { FC } from 'react'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { maxLenghtCreator, requiredFild } from '../../../../utils/validators/validators'
import { createField, Textarea } from '../../../common/FormControls/FormControls'
import { CreateFieldNamePropertiesType, PostMessageReduxFormType } from '../MyPostsContainer'


const maxLenght10 = maxLenghtCreator(10)

const PostForm: FC<InjectedFormProps<PostMessageReduxFormType, PostMessageOwnProps> & PostMessageOwnProps> = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                {createField<CreateFieldNamePropertiesType>("Required fild", "post", [ requiredFild, maxLenght10 ], Textarea)}
            </div>

            <div>
                <button>Add Post</button>
            </div>
        </form>
    )
}

const PostReduxForm = reduxForm<PostMessageReduxFormType, PostMessageOwnProps>({
    form: 'post'
})(PostForm)

export default PostReduxForm

type PostMessageOwnProps = {
}