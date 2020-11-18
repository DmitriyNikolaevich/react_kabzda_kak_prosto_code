import React from 'react';
import s from './Dialogs.module.css';
import MessageReduxForm from './MessageForm/MessageForm';

const Dialogs = (props) => {

    const onSubmit = (submitData) => {
        //props.addMessage();
        console.log(submitData.message);
        props.addMessageActionCreator(submitData.message);
        
    }
    
    return (
        <div className={s.dialogs}>
            <div className={s.dialogs_items}>
                {props.dialogItems}
            </div>
            <div className={s.messages}>
                {props.messageItems}
                <MessageReduxForm onSubmit={onSubmit}/>
            </div>
        </div>
    )
}

export default Dialogs;