import { Dispatch } from 'redux'
import { FormAction } from "redux-form"
import { chatAPI } from "../api/chat-api"
import { ChatMessageAPIType } from "../Pages/ChatPage"
import { BaseThunkType, InfernActionTypes } from "./reduxStore"
import { v1 } from 'uuid'



let initialState = {
    messages: [] as ChatMessageType[],
    status: 'panding' as Status
}

let chatReducer = (state: InitialStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case 'SocNet/chat/MESSAGE_RECIEVED':
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages.map(m => ({...m, id: v1()}))].filter((m, index, array) => index >= array.length - 100)
            }

        case 'SocNet/chat/STATUS_CHENGED':
            return {
                ...state,
                status: action.payload.status
            }

        default:
            return state
    }
}

export const actions = {
    messageRecieved: (messages: ChatMessageAPIType[]) => ({
        type: 'SocNet/chat/MESSAGE_RECIEVED', payload: { messages } 
    } as const),
    statusChenged: (status: Status) => ({
        type: 'SocNet/chat/STATUS_CHENGED', payload: { status }
    } as const)
}

let _newMessageHandler: ((messages: ChatMessageAPIType[]) => void) | null = null

const newMessageHandleCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messageRecieved(messages))
        }
    }

    return _newMessageHandler
}

let _statusChengingHandler: ((status: Status) => void) | null = null

const statusChengingHandleCreator = (dispatch: Dispatch) => {
    if (_statusChengingHandler === null) {
        _statusChengingHandler = (status) => {
            dispatch(actions.statusChenged(status))
        }
    }

    return _statusChengingHandler
}


export const startMessagesListening = (): ThunkType => {
    return async (dispatch) => {
        chatAPI.start()
        chatAPI.subscribe('messages-received', newMessageHandleCreator(dispatch))
        chatAPI.subscribe('status-chenged', statusChengingHandleCreator(dispatch))
    }
}

export const stopMessagesListening = (): ThunkType => {
    return async (dispatch) => {
        chatAPI.unsubscribe('messages-received', newMessageHandleCreator(dispatch))
        chatAPI.unsubscribe('status-chenged', statusChengingHandleCreator(dispatch))
        chatAPI.stop()
    }
}

export const sendMessage = (message: string): ThunkType => {
    return async (dispatch) => {
        chatAPI.sendMessage(message)
    }
}



export default chatReducer


type ChatMessageType = ChatMessageAPIType & {id: string}

export type Status = 'panding' | 'ready' | 'error'

type InitialStateType = typeof initialState

type ActionType = InfernActionTypes<typeof actions>

type ThunkType = BaseThunkType<ActionType | FormAction>