import React from 'react';
import s from './Contact.module.css';

const Contact = ({contactTitle, contactDescription}) => {
    return (
        <div className={s.contact}>
            <b>{contactTitle}</b>: {contactDescription}
        </div>
    )
}

export default Contact;