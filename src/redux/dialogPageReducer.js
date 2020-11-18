const ADD_MESSAGE = 'ADD-MESSAGE';
// const WRITE_MESSAGE = 'WRITE-MESSAGE';

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
  };

const dialogPageReducer = (state = initialState, action) => {
         
    switch (action.type) {

        // case WRITE_MESSAGE:
        //     return {
        //       ...state,
        //       newMessageText: action.newLetter
        //     };


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

export const addMessageActionCreator = (message) => ({ type: ADD_MESSAGE, message: message });
//export const writeMessageActionCreator = (text) =>
//  ({ type: WRITE_MESSAGE, newLetter: text });

export default dialogPageReducer;