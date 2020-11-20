import React from 'react';
import { reduxForm } from 'redux-form';
import { createField, Input, Textarea } from '../../common/FormControls/FormControls';
import Contact from './Contact';

const Form = ({lookingForAJob, contacts, handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            <button>Save profile data</button>
            {error &&   <div>
                            {error}
                        </div>}
            <div>
                <b>Full name</b>: {createField("Full name", "fullName", [], Input)}.
            </div>
            <div>
                <b>Looking for a job</b>: {lookingForAJob ? "yes" : "no"}.
                {createField("", "lookingForAJob", [], Input, {type: "checkbox"})}
            </div>
            
            <div>
                <b>My professional skills</b>: {createField("My professional skills", "lookingForAJobDescription", [], Textarea)}.
            </div>
            
            <div>
                <b>About me</b>: {createField("About me", "aboutMe", [], Textarea)}
            </div>
            <div>
                <b>Contacts</b>: {Object.keys(contacts).map(key => { return <Contact unicKey={key} contactTitle={key} contactDescription={createField(`Write ${key} account`, "contacts." + key, [], Input)} /> })}
            </div>
        </form>
    )
}

const ProfileDataForm = reduxForm({
    form: 'profileDataForm'
})(Form);

export default ProfileDataForm;