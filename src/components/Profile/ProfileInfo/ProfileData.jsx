import React from 'react';
import Contact from './Contact';

const ProfileData = ({fullName, lookingForAJob, lookingForAJobDescription, aboutMe, contacts}) => {
    return (
        <div>
            <div>
                <b>Full name</b>: {fullName}.
                    </div>
            <div>
                <b>Looking for a job</b>: {lookingForAJob ? "yes" : "no"}.
                    </div>
            {lookingForAJob &&
                <div>
                    <b>My professional skills</b>: {lookingForAJobDescription}
                        </div>
            }
            <div>
                <b>About me</b>: {aboutMe}
            </div>
            <div>
                <b>Contacts</b>: {Object.keys(contacts).map(key => { return <Contact key={key} contactTitle={key} contactDescription={contacts[key]} /> })}
            </div>
        </div>
    )
}

export default ProfileData;