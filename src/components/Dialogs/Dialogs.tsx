import React, { FC } from 'react'
import s from './Dialogs.module.css'
import MessageReduxForm from './MessageForm/MessageForm'

type PropsType = {
    dialogItems: string
    messageItems: string
    addMessageActionCreator: (message: string) => void
}

const Dialogs: FC<PropsType> = ({ dialogItems, messageItems, addMessageActionCreator }) => {

    const onSubmit = (submitData: any) => {
        //props.addMessage();
        console.log(submitData.message);
        addMessageActionCreator(submitData.message);
        
    }
    
    return (
        <div className={s.dialogs}>
            <div className={s.dialogs_items}>
                {dialogItems}
            </div>
            <div className={s.messages}>
                {messageItems}
                <MessageReduxForm onSubmit={onSubmit}/>
            </div>
        </div>
    )
}

export default Dialogs