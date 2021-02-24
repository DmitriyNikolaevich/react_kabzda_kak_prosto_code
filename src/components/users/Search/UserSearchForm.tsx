import { Field, Form, Formik } from "formik"
import { FilterType } from "../../../redux/usersPageReducer"

const usersSearchFormValidate = (values: any) => {
    const errors = {}
    return errors
}


const UserSearchForm: React.FC<PropsTypes> = ({ onFilterChange }) => {

    const submit = (values: FilterType, { setSubmitting }: {setSubmitting: (isSubmiting: boolean) => void}) => {        //(setSubmiting: boolean) => void
        onFilterChange(values)
        setSubmitting(false)
    } 

    return (
        <div>
            <Formik
                initialValues={{ term: '' }}
                validate = {usersSearchFormValidate}
                onSubmit={submit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Field type="text" name="term" />
                        <button type="submit" disabled={isSubmitting}>
                            Search
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default UserSearchForm

type PropsTypes = {
    onFilterChange: (filter: FilterType) => void
}