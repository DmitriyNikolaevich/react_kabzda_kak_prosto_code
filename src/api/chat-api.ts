import { Status } from './../redux/chatReducer'
import { ChatMessageAPIType } from './../Pages/ChatPage'

let subscribers = {
    'messages-received': [] as MessageReceivedSubscriberType[],
    'status-chenged': [] as StatusChengedSubscriberType[]
} 

let ws: WebSocket | null = null
type EventsNamesType = 'messages-received' | 'status-chenged'

const closeHandler = () => {
    notifySubscribersAboutStatus('panding')
    setTimeout(createChannel, 3000)
}

let messageHandler = (e: MessageEvent) => {
    let newMessage = JSON.parse(e.data)
    subscribers['messages-received'].forEach(s => s(newMessage))
}

let openHandler = () => {
    notifySubscribersAboutStatus('ready')
}

let errorHandler = () => {
    notifySubscribersAboutStatus('error')
    console.log('RESTART PAGE')
}

const cleanUp = () => {
    ws?.removeEventListener('close', closeHandler)
    ws?.removeEventListener('message', messageHandler)
    ws?.removeEventListener('open', openHandler)
    ws?.removeEventListener('error', errorHandler)
    ws?.close()
}

function createChannel() {
    cleanUp()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    notifySubscribersAboutStatus('panding')
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', messageHandler)
    ws.addEventListener('open', openHandler)
    ws.addEventListener('error', errorHandler)
}

const notifySubscribersAboutStatus = (status: Status) => {
    subscribers['status-chenged'].forEach(s => s(status))
}

export const chatAPI = {
    subscribe(eventName: EventsNamesType, callback: MessageReceivedSubscriberType | StatusChengedSubscriberType) {
        //@ts-ignore
        subscribers[eventName].push(callback)
        return () => {
            //@ts-ignore
            subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
        }
    },
    unsubscribe(eventName: EventsNamesType, callback: MessageReceivedSubscriberType | StatusChengedSubscriberType) {
        //@ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
    },
    sendMessage(message: string) {
        ws?.send(message)
    },
    start() {
        createChannel()
    },
    stop() {
        subscribers['messages-received'] = []
        subscribers['status-chenged'] = []
        cleanUp()
    }
}

type MessageReceivedSubscriberType = (messages: ChatMessageAPIType[]) => void
type StatusChengedSubscriberType = (status: Status) => void