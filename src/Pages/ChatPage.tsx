import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { sendMessage, startMessagesListening, stopMessagesListening } from "../redux/chatReducer"
import { AppStateType } from "../redux/reduxStore"

const ChatPage: React.FC = (props) => {
    return (
        <div>
            <Chat />
        </div>
    )
}

export default ChatPage

const Chat: React.FC = () => {

    const dispatch = useDispatch()

    const status = useSelector((state: AppStateType) => state.chat.status)

    useEffect( () => {
        dispatch(startMessagesListening())

        return () => {
            dispatch(stopMessagesListening())
        }
    },[])

    return (
        <div>
            {status === 'error' && <div>Some error occured. Please refresh the page.</div>} 
            <>
                <Messages />
                <AddMessageForm status={status} />
            </>
            
        </div>
    )
}

export type ChatMessageAPIType = {
    message: string
    photo: string
    userId: number
    userName: string
}

const Messages: React.FC = React.memo(() => {

    const messages = useSelector((state: AppStateType) => state.chat.messages)
    
    const messageAncorRef = useRef<HTMLDivElement>(null)

    const [isAutoScroll, setIsAutoScroll] = useState(true)

    const onScrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget
        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 50) {
            setIsAutoScroll(true)
        } else {
            setIsAutoScroll(false)
        }
    }

    useEffect(() => {
        if (isAutoScroll) {
            messageAncorRef.current?.scrollIntoView({behavior: 'smooth'})   
        }
    },[messages])

    return (
        <div style={{ height: '500px', overflowY: 'auto' }} onScroll={onScrollHandler}>
            {messages.map((mes) => <Message key={mes.id} message={mes} />)}
            <div ref={messageAncorRef}></div>
        </div>
    )
})

const Message: React.FC<MessagePropsType> = ({ message }) => {

    return (
        <div>
            <img src={message.photo} style={{ height: '30px' }} /> <b>{message.userName}</b>
            <br />
            {message.message}
            <hr />
        </div>
    )
}

type MessagePropsType = {
    message: ChatMessageAPIType
}

const AddMessageForm: React.FC<{ status: string }> = ({ status }) => {

    const [mess, setMess] = useState('')
    const dispatch = useDispatch()

    const sendMess = () => {
        if (!mess) {
            return
        }
        dispatch(sendMessage(mess))
        setMess('')
    }

    return (
        <div>
            <div>
                <textarea onChange={(e) => setMess(e.currentTarget.value)} value={mess}></textarea>
            </div>
            <div>
                <button disabled={status !== 'ready'} onClick={sendMess}>Send</button>
            </div>
        </div>
    )
}