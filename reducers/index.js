import { GET_DECKS, GET_DECK, ADD_CARD, CREATE_DECK  } from '../actions'

function flashcards (state = {}, action) {
    debugger
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
            return {}
        case CREATE_DECK :
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