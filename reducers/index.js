import { GET_DECKS, GET_DECK, ADD_CARD, CREATE_DECK  } from '../actions'

function flashcards (state = {}, action) {
    switch (action.type) {
        case GET_DECKS :
            return {
                ...state,
                ...action.decks
            }
        case GET_DECK :
            return {
                ...state,
                ...action.deck
            }
        case ADD_CARD :
            const { title } = action
            return {
                ...state,
                [title]: {
                        title: title,
                         questions: [
                             ...state[title].questions.concat([action.card])
                            ]
                }
            }
        case CREATE_DECK :
        //debugger
            return  {
                ...state,
                [action.title]: {
                    title: action.title,
                    questions: []
                }
            }
        default :
            return state
    }
}

export default flashcards