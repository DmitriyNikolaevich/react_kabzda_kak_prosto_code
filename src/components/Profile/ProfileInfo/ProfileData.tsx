import React from 'react';
import { ContactsType } from '../../../types/type';
import Contact from './Contact';

const ProfileData: React.FC<PropsTypes> = ({fullName, lookingForAJob, lookingForAJobDescription, aboutMe, contacts}) => {
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
                <b>Contacts</b>: {Object
                                    .keys(contacts)
                                    .map(key => { return <Contact 
                                                            key={key} 
                                                            contactTitle={key} 
                                                            contactDescription={contacts[key as keyof ContactsType]} /> })}
            </div>
        </div>
    )
}

export default ProfileData

type PropsTypes = {
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    aboutMe: string | undefined
    contacts: ContactsType
}