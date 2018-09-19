export const GET_DECKS = 'GET_DECKS'
export const GET_DECK = 'GET_DECK'
export const CREATE_DECK = 'CREATE_DECK'
export const ADD_CARD = 'ADD_CARD'
import { getInitialData } from '../utils/api'


export function handleInitialData () {
    debugger
    return (dispatch) => {
        return getInitialData()
	      .then(({decks}) => {
              debugger
	        dispatch(receiveDecks(decks))
          })
    }
}

export function receiveDecks (decks) {
    debugger
    return {
        type: GET_DECKS,
        decks
    }
}

export function receiveDeck (deck) {
    return {
        type: GET_DECK,
        deck
    }
}

export function createDeck (title) {
    debugger
    return {
        type: CREATE_DECK,
        title
    }
}

export function addCard (question) {
    return {
        type: ADD_CARD,
        question
    }
}