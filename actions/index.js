export const GET_DECKS = 'GET_DECKS'
export const GET_DECK = 'GET_DECK'
export const CREATE_DECK = 'CREATE_DECK'
export const ADD_CARD = 'ADD_CARD'
import { getInitialData } from '../utils/api'
import { AsyncStorage } from 'react-native'
import { FLASHCARDS_KEY } from '../utils/helpers';


export function handleInitialData () {
    //debugger
    return (dispatch) => {
        //AsyncStorage.removeItem(FLASHCARDS_KEY)
        return getInitialData()
	      .then(({decks}) => {
            AsyncStorage.getItem(FLASHCARDS_KEY)
              .then(results => {
                if(results !== null) {
                    dispatch(receiveDecks(JSON.parse(results)))
                    AsyncStorage.mergeItem(FLASHCARDS_KEY, JSON.stringify(JSON.parse(results)))
                }
              })
            AsyncStorage.mergeItem(FLASHCARDS_KEY, JSON.stringify(decks))
          })
    }
}

export function receiveDecks (decks) {
    //debugger
    return {
        type: GET_DECKS,
        decks
    }
}

export function createDeck (title) {
    //debugger
    return {
        type: CREATE_DECK,
        title
    }
}

export function saveCard (title, card) {
    return {
        type: ADD_CARD,
        title,
        card
    }
}