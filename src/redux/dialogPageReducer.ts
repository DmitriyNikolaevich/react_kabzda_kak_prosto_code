import { InfernActionTypes } from "./reduxStore"


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

const dialogPageReducer = (state: InitializStateType = initialState, action: ActionsType): InitializStateType => {
         
    switch (action.type) {

        case 'SocNet/dialog/ADD-MESSAGE':
            
            let newMessage = {
              id: 6,
              message: action.message
            }
            return {
              ...state,
              messages: [...state.messages, newMessage],
              newMessageText: ""
            }

        default:
            return state
    }
}

export const actions = {
  addMessageActionCreator: (message: string) => ({ type: 'SocNet/dialog/ADD-MESSAGE', message: message } as const)
}


export default dialogPageReducer


export type InitializStateType = typeof initialState

type ActionsType = InfernActionTypes<typeof actions>