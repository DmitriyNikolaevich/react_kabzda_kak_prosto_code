const ADD_MESSAGE = 'ADD-MESSAGE';

type MessagesType = {
  id: number
  message: string | null
}

type DialogsTypa = {
  id: number
  name: string | null
}

type InitializStateType = {
  dialogs: Array<DialogsTypa>
  messages: Array<MessagesType>
  newMessageText: string | null
}

type AddMessageActionCreatorType = {
  type: typeof ADD_MESSAGE
  message: string
}

type ActionType = AddMessageActionCreatorType

let initialState = {
    dialogs: [
      { id: 1, name: "Dima" },
      { id: 2, name: "Jora" },
      { id: 3, name: "Sveta" },
      { id: 4, name: "Sasha" }
    ],
    messages: [
      { id: 1, message: "Hi!" },
      { id: 2, message: "How do you do?" },
      { id: 3, message: "Yo" },
      { id: 4, message: "Yo" },
      { id: 5, message: "Yo" }
    ],
    newMessageText: "Mes"
  }

const dialogPageReducer = (state: InitializStateType = initialState, action: ActionType): InitializStateType => {
         
    switch (action.type) {

        case ADD_MESSAGE:
            
            let newMessage = {
              id: 6,
              message: action.message
            };
            return {
              ...state,
              messages: [...state.messages, newMessage],
              newMessageText: ""
            };

        default:
            return state;
    }
}

export const addMessageActionCreator = (message: string): AddMessageActionCreatorType => ({ type: ADD_MESSAGE, message: message });

export default dialogPageReducer;