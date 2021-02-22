import React, { FC } from 'react'
import { InitializStateType } from '../../redux/dialogPageReducer'
import s from './Dialogs.module.css'
import MessageReduxForm from './MessageForm/MessageForm'

const Dialogs: FC<PropsType> = ({ dialogItems, messageItems, addMessageActionCreator }) => {

    const onSubmit = (submitData: {message: string}) => {
        addMessageActionCreator(submitData.message)
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


type PropsType = {

    dialogItems: InitializStateType
    messageItems: InitializStateType
    addMessageActionCreator: (message: string) => void
}